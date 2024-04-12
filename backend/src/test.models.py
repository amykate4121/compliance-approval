from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForTokenClassification, TrainingArguments, Trainer, pipeline, DataCollatorForTokenClassification
import evaluate
import numpy as np
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# THIS CODE IS UTALISED IN MAIN.PY
# THIS CLASS WAS FOR INITIAL EXPERIMENTATION WITH THE MODEL
# HAS ALSO BEEN USED FOR TESTING

# example body of report
example = 'These materials are confidential and may not be used, edited, altered, reproduced, published or distributed without consent. Please note that all information in this report is fictionalised. Example Google Report.  I work at Google. My experience so far at work has been awful.  This report will focus on team x at Google.  Agile is an software development lifecycle that allows for periodic feedback from users.  I think that the current approach of the team is awful. The team dont bother considering the needs of users.  One suggestion is that an agile approach is adopted.'
sequence = example.split('. ')

# load the finetuned models
nerTokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
nerModel = AutoModelForTokenClassification.from_pretrained("./savedModels/ner")
sequenceTokenizer = AutoTokenizer.from_pretrained("finiteautomata/bertweet-base-sentiment-analysis")
sequenceModel = AutoModelForSequenceClassification.from_pretrained("./savedModels/sequence")

# run the ner model to find concerns
nerPipeline = pipeline("ner", model=nerModel, tokenizer=nerTokenizer)
nerResults = nerPipeline(example)
print(nerResults)

# run the sequence model to identify non-compliant words
sequencePipeline = pipeline("sentiment-analysis", model=sequenceModel, tokenizer=sequenceTokenizer)
sequenceResults = sequencePipeline(sequence)

# find the full sentence that contains a word of concern and highlight the concern for ner model to provice contect
concerns = []
for concern in nerResults:
    # find the sentences
    y = concern.get('start')
    uptoconcern = example[0:y]
    numFullStops = uptoconcern.count('.')
    concerningsentence = sequence[numFullStops]
    concerns.append({'concerningsentence': concerningsentence, 'entityType': concern.get('entity')})
    y=y+1
# for report find sentense with concerning word.  this gives more context
print(concerns)

# associate the sentence with the concern based on sequence
labels = []
for i, classification in enumerate(sequenceResults):
    label = classification.get('label')
    if(label != 'neutral'):
        labels.append({'concerningsentence': sequence[i], 'entityType': label})

print(labels)

allConcerns = concerns + labels

print("All sentences:")
for sentence in sequence:
    print(sentence)
print("Concerns:")
for concern in allConcerns:
    print(concern)


expectedConcerns = [{'concerningsentence': 'Example Google Report', 'entityType': 'organization-company'},
                    {'concerningsentence': ' This report will focus on team x at Google', 'entityType': 'organization-company'},
                    {'concerningsentence': ' This report will focus on team x at Google', 'entityType': 'organization-company'},
                    {'concerningsentence': 'My experience so far at work has been awful', 'entityType': 'bearish'},
                    {'concerningsentence': ' I think that the current approach of the team is awful', 'entityType': 'bearish'},
                    {'concerningsentence': 'The team dont bother considering the needs of users', 'entityType': 'bearish'},
                    {'concerningsentence': ' One suggestion is that an agile approach is adopted.', 'entityType': 'bullish'},
                   ]


# test that the findings are as expected
assert allConcerns == expectedConcerns, "Concerns are not as expected"
print("Concerns are as expected")
