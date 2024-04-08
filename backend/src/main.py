# coding=utf-8

from flask import Flask, jsonify, request
from flask_cors import CORS
from .entities.entity import Session, engine, Base
from .entities.exam import Exam, ExamSchema
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


@app.route('/exams')
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Exam).all()

    # transforming into JSON-serializable objects
    schema = ExamSchema(many=True)
    exams = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(exams)


@app.route('/exams', methods=['POST'])
@requires_auth
# AMY EDIT HERE
def add_exam():
    session = Session()
    session.query(Exam).delete()
    session.commit()
    session.close()

    # mount exam object
    posted_exam = ExamSchema(only=('sentence', 'description', 'fullBody'))\
        .load(request.get_json())

    body = posted_exam.get('sentence')

    # AMY CHANGE TO BE ACC REPORT
    # body = 'Please note that all information in this report is fictionalised. Example Google Report.  I work at Google. My experience so far at work has been awful.  This report will focus on team x at Google.  Agile is an software development lifecycle that allows for periodic feedback from users.  I think that the current approach of the team is awful. The team dont bother considering the needs of users.  One suggestion is that an agile approach is adopted.'
    sequence = body.split('.')

    # load the finetuned models
    nerTokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
    nerModel = AutoModelForTokenClassification.from_pretrained("C:/Users/amyka/Documents/year 4/Dissertation/compliance-approval-portal/backend/src/savedModels/ner")
    sequenceTokenizer = AutoTokenizer.from_pretrained("finiteautomata/bertweet-base-sentiment-analysis")
    sequenceModel = AutoModelForSequenceClassification.from_pretrained("C:/Users/amyka/Documents/year 4/Dissertation/compliance-approval-portal/backend/src/savedModels/sequence")

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
    exam = ''
    # post each finding of the ner report and save it
    for concern in concerns:
        posted_exam = {'sentence': concern.get('concerningSentence'), 'description': concern.get('issue'), 'fullBody': body}
        exam = Exam(**posted_exam, created_by="HTTP post request")
        session.add(exam)
        session.commit()

    # post each finding of the ner report and save it
    for label in labels:
        posted_exam = {'sentence': label.get('concerningSentence'), 'description': label.get('issue'), 'fullBody': body}
        exam = Exam(**posted_exam, created_by="HTTP post request")
        session.add(exam)
        session.commit()

    # return created exam
    new_exam = ExamSchema().dump(exam)
    # session.close()
    return jsonify(new_exam), 201

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response