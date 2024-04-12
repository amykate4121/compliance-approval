# coding=utf-8
from flask import Flask, jsonify, request
from flask_cors import CORS
from .entities.entity import Session, engine, Base
from .entities.report import AiReport, AiReportSchema
from .auth import AuthError, requiresAuth
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForTokenClassification, \
    TrainingArguments, Trainer, pipeline, DataCollatorForTokenClassification
import evaluate
import numpy as np
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# run the bulk of the backend, involving running the ai models and creating report


# creating the Flask application
app = Flask(__name__)
CORS(app)

# generate db schema
Base.metadata.create_all(engine)


# get latest AI report from db
@app.route('/ai-report')
def getAiReport():
    # get full db
    session = Session()
    fullReport = session.query(AiReport).all()

    # turn report into JSON
    schema = AiReportSchema(many=True)
    report = schema.dump(fullReport)
    session.close()
    return jsonify(report)


# generate AI report and add to db
@app.route('/ai-report', methods=['POST'])
@requiresAuth
# AMY EDIT HERE
def addAiReport():
    # for compliance reasons only the latest report is stored, so delete all previous
    session = Session()
    session.query(AiReport).delete()
    session.commit()
    session.close()

    # get the full body of the report, and split this into sentences
    newReport = AiReportSchema(only=('sentence', 'description', 'fullBody')) \
        .load(request.get_json())
    body = newReport.get('fullBody')
    sequence = body.split('.')

    # load the finetuned models
    nerTokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
    nerModel = AutoModelForTokenClassification.from_pretrained("./src/savedModels/ner")
    sequenceTokenizer = AutoTokenizer.from_pretrained("finiteautomata/bertweet-base-sentiment-analysis")
    sequenceModel = AutoModelForSequenceClassification.from_pretrained("./src/savedModels/sequence")

    # run the ner model to find concerns
    nerPipeline = pipeline("ner", model=nerModel, tokenizer=nerTokenizer)
    nerResults = nerPipeline(body)

    # run the sequence model to identify non-compliant words
    sequencePipeline = pipeline("sentiment-analysis", model=sequenceModel, tokenizer=sequenceTokenizer)
    sequenceResults = sequencePipeline(sequence)

    # find the full sentence that contains a word of concern and highlight the concern for ner model to provide contect
    concerns = []
    for concern in nerResults:
        # find the sentences
        y = concern.get('start')
        uptoconcern = body[0:y]
        numFullStops = uptoconcern.count('.')
        concerningsentence = sequence[numFullStops]
        concerns.append({'concerningSentence': concerningsentence, 'issue': concern.get('entity')})
        y = y + 1

    # associate the sentence with the concern based on sequence
    labels = []
    for i, classification in enumerate(sequenceResults):
        label = classification.get('label')
        if (label != 'neutral'):
            labels.append({'concerningSentence': sequence[i], 'issue': label})

    session = Session()
    report = ''
    # post each finding of the ner report and save it
    for concern in concerns:
        newReport = {'sentence': concern.get('concerningSentence'), 'description': concern.get('issue'),
                     'fullBody': body}
        report = AiReport(**newReport, created_by="HTTP post request")
        session.add(report)
        session.commit()

    # post each finding of the ner report and save it
    for label in labels:
        newReport = {'sentence': label.get('concerningSentence'), 'description': label.get('issue'), 'fullBody': body}
        report = AiReport(**newReport, created_by="HTTP post request")
        session.add(report)
        session.commit()

    # return created report
    addedReport = AiReportSchema().dump(report)
    session.close()
    return jsonify(addedReport), 201


# handle any authentication errors
@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
