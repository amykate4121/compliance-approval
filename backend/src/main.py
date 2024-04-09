# coding=utf-8

from flask import Flask, jsonify, request
from flask_cors import CORS
from .entities.entity import Session, engine, Base
from .entities.report import AiReport, AiReportSchema
from .auth import AuthError, requires_auth


from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForTokenClassification, TrainingArguments, Trainer, pipeline, DataCollatorForTokenClassification
import evaluate
import numpy as np
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# creating the Flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route('/ai-report')
def getAiReport():
    # fetching from the database
    session = Session()
    fullReport = session.query(AiReport).all()

    # transforming into JSON-serializable objects
    schema = AiReportSchema(many=True)
    report = schema.dump(fullReport)

    # serializing as JSON
    session.close()
    return jsonify(report)


@app.route('/ai-report', methods=['POST'])
@requires_auth
# AMY EDIT HERE
def addAiReport():
    session = Session()
    session.query(AiReport).delete()
    session.commit()
    session.close()

    # mount exam object
    newReport = AiReportSchema(only=('sentence', 'description', 'fullBody'))\
        .load(request.get_json())

    body = newReport.get('fullBody')

    # AMY CHANGE TO BE ACC REPORT
    # body = 'Please note that all information in this report is fictionalised. Example Google Report.  I work at Google. My experience so far at work has been awful.  This report will focus on team x at Google.  Agile is an software development lifecycle that allows for periodic feedback from users.  I think that the current approach of the team is awful. The team dont bother considering the needs of users.  One suggestion is that an agile approach is adopted.'
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

    # find the full sentence that contains a word of concern and highlight the concern for ner model to provice contect
    concerns = []
    for concern in nerResults:
        # find the sentences
        y = concern.get('start')
        uptoconcern = body[0:y]
        numFullStops = uptoconcern.count('.')
        concerningsentence = sequence[numFullStops]
        concerns.append({'concerningSentence': concerningsentence, 'issue': concern.get('entity')})
        y = y + 1
    # for report find sentense with concerning word.  this gives more context

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
        newReport = {'sentence': concern.get('concerningSentence'), 'description': concern.get('issue'), 'fullBody': body}
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
    # session.close()
    return jsonify(addedReport), 201

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response