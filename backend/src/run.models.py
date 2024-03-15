from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForTokenClassification, TrainingArguments, Trainer, pipeline, DataCollatorForTokenClassification
import evaluate
import numpy as np
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# comment and tidy this to then use to generate a report
nertokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
nermodel = AutoModelForTokenClassification.from_pretrained("./models/ner")

nlp = pipeline("ner", model=nermodel, tokenizer=nertokenizer)
example = 'Please note that all information in this report is fictionalised. Example essay. I work at Google.  My managers name is Frank.  My experience so far at work has been awful.  This report will focus on team development101 at Google.  I think that the current approach of the team is awful. Agile is a software development lifecycle that allows for periodic feedback from users. The team dont bother considering the needs of users.  One suggestion is that an agile approach is adopted.'

ner_results = nlp(example)

sentencesSplit = example.split('.')
concerns =[]
for concern in ner_results:
    y = concern.get('start')
    uptoconcern = example[0:y]
    numFullStops = uptoconcern.count('.')
    concerningsentence = sentencesSplit[numFullStops]
    concerns.append({'concerningsentencence': concerningsentence, 'entityType': concern.get('entity')})
    y=y+1
# for report find sentense with concerning word.  this gives more context
print(concerns)


tokenizer = AutoTokenizer.from_pretrained("finiteautomata/bertweet-base-sentiment-analysis")
model = AutoModelForSequenceClassification.from_pretrained("./models/sequence")

sequences = ['PLEASE NOTE THAT ALL INFORMATION IN THIS REPORT IS FICTIONALISED.', 'Example essay.', 'I work at Google.', 'My managers name is Frank', 'My experience so far at work has been awful.', 'The report will focus on team x at Google.', 'Agile is an software development lifecycle that allows for periodic feedback from users.', 'I think that the current approach of the team is awufl.', 'The team dont even bother consideringuser needs', 'One suggestion is that an agile approach is adopted']
tokens = tokenizer(sequences, padding=True, truncation=True, return_tensors="pt")
output = model(**tokens)

classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
res = classifier(sequences)
print(res)