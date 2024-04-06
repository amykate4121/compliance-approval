# DO NOT RUN LOCALLY
# Due to memory errors, this code was run using a google colab using a TPU
# Colab supports running a runtime for 12 hours, therefore models were saved locally every 12 hours and loaded from local to continue training
# Saved models were then downloaded and saved locally

from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForTokenClassification, TrainingArguments, Trainer, pipeline, DataCollatorForTokenClassification
import evaluate
import numpy as np

# generate a tokenizer by pulling it in from the pretrained hugging face model that is being used
# this tokenizer will be used to clean up the input and training data
def generateTokenizer(modelName):
    return AutoTokenizer.from_pretrained(modelName)

# load the required dataset
# this dataset is from hugging face
# it may or may not require additional params
def loadDataset(datasetName, params):
    if(params == None):
        return load_dataset(datasetName)
    return load_dataset(datasetName, params)

# load a pre trained hugging face model that will be used for token or sequence classification
# specify label names to match the labels used by the data set
def generateModel(modelName, labelNames, classificationType):
    counter = 0
    id2label = {}
    label2id = {}
    for label in labelNames:
        id2label[counter] = label
        label2id[label] = counter
        counter += 1
    return classificationType.from_pretrained(
        modelName,
        id2label = id2label,
        label2id = label2id,
        ignore_mismatched_sizes=True
    )

# tokenize the data so that it can be processed by the model
# tokenize the column that should be treated as input
# specify which column to treat as labels
def tokenizeData(dataset, tokenizeFunction, id, labelCol):
    tokenizedData = dataset.map(tokenizeFunction, batched=True)
    tokenizedData = tokenizedData.rename_column(labelCol, "labels")
    return tokenizedData

# tokenize the financial tweets data set
def tokenizeFinancialTweets(examples):
    return tokenizer(
        examples["tweet"],
        padding="max_length",
        truncation=True
    )

# tokenize the few nerd data set
def tokenizeFewNerd(examples):
    return tokenizer(
        examples["tokens"],
        padding="max_length",
        truncation=True,
        is_split_into_words=True
    )

# finetune the model based on the training data
# evaluate based on the test data
# save this model locally for use later
def trainAndEvaluateModel(model, trainDataset, evalDataset, computeMetrics, dataCollator, savePath):
    trainer = finetuneModel(
        model,
        trainDataset,
        evalDataset,
        computeMetrics,
        dataCollator
    )
    print(trainer.evaluate())
    trainer.save_model(savePath)
    # NOTE - for saving in colab, use trainer.save_model(f"/content/gdrive/My Drive/Colab Notebooks/diss/models/{savePath}")
    return trainer.model

# finetune the model using the training data
def finetuneModel (model, trainDataset, evalDataset, computeMetrics, dataCollator):
    trainingArguments = TrainingArguments("test_trainer")
    trainer = Trainer(
        model = model,
        args=trainingArguments,
        train_dataset=trainDataset,
        eval_dataset=evalDataset,
        compute_metrics=computeMetrics,
        data_collator=dataCollator,
    )
    trainer.train()
    return trainer

# compute the metrics for how the sequence classification model performs
def computeSequenceMetrics (evaluatePredictions):
    metric = evaluate.load("accuracy")
    logits, labels = evaluatePredictions
    predictions = np.argmax(logits, axis=1)
    metrics = metric.compute(predictions = predictions, references=labels)
    return metrics

# compute the metrics for how the token classification model performs
# due to the nature of the model and padding of the dataset certain labels need to be removed in order to develop accurate predictions
def computeTokenMetrics(evaluationPredictions):
    metric = evaluate.load("seqeval")
    logits, labels = evaluationPredictions

    labelNames = nerTokenizedData["train"].features["labels"].feature.names
    namedLabels = []
    for labelRow in labels:
        namedLabelRow = []
        for label in labelRow:
            if label != -100:
                namedLabelRow.append(labelNames[label])
        namedLabels.append(namedLabelRow)

    predictions = np.argmax(logits, axis=-1)
    true_predictions = [
        [labelNames[p] for (p, l) in zip(prediction, label) if l != -100]
        for prediction, label in zip(predictions, labels)
    ]


    all_metrics = metric.compute(predictions=true_predictions, references=namedLabels)
    return {
        "precision": all_metrics["overall_precision"],
        "accuracy": all_metrics["overall_accuracy"],
    }

# set sequence model name
sequenceModelName = "finiteautomata/bertweet-base-sentiment-analysis"
# get tokenizer from pretrained model
tokenizer = generateTokenizer(sequenceModelName)
# load dataset for fine tuning sequence model
sequenceDataset = loadDataset("TimKoornstra/financial-tweets-sentiment", None)
# tokenize dataset used for fine tuning sequence model
sequenceTokenizedData = tokenizeData(
    sequenceDataset,
    tokenizeFinancialTweets,
    "tweet",
    "sentiment"
)
# generate model for sequence classification
# NOTE - for loading from local checkpoint in colad, use /content/gdrive/My Drive/Colab Notebooks/diss/models/sequence/ as model name
sequenceModel = generateModel(
    sequenceModelName,
    sequenceTokenizedData["train"].features["labels"].names,
    AutoModelForSequenceClassification
)
# train and evaluate model for sequence classification
sequenceModel = trainAndEvaluateModel(
    sequenceModel,
    # sequenceTokenizedData["train"].select(range(19000)),
    # sequenceTokenizedData["train"].select(range(19000, 38000)),
    sequenceTokenizedData["train"].select(range(2)),
    sequenceTokenizedData["train"].select(range(2, 3)),
    computeSequenceMetrics,
    None,
    './savedModels/sequence'
)


# set the ner model name
nerModelName = "dslim/bert-large-NER"
# get tokenizer from pretrained model
tokenizer = generateTokenizer(nerModelName)
# load data set for fine tuning ner model
nerDataset = loadDataset("DFKI-SLT/few-nerd", 'inter')
# tokenizer dataset used for fine tuning ner model
nerTokenizedData = tokenizeData(
    nerDataset,
    tokenizeFewNerd,
    "id",
    "fine_ner_tags"
)
# generate ner model for token classification
# NOTE - for loading from local checkpoint in colab, use /content/gdrive/My Drive/Colab Notebooks/diss/models/ner/ as model name
nerModel = generateModel(
    nerModelName,
    nerTokenizedData["train"].features["labels"].feature.names,
    AutoModelForTokenClassification
)
# train and evaluate ner model for token classification
# NOTE- when running in colab run in batches of 5000 train and test data sets due to 12 hour Run time limit
nerModel = trainAndEvaluateModel(
    nerModel,
    # nerTokenizedData["train"].select(range(20000)),
    # nerTokenizedData["test"].select(range(14000)),
    nerTokenizedData["train"].select(range(2)),
    nerTokenizedData["test"].select(range(1)),
    computeTokenMetrics,
    DataCollatorForTokenClassification(tokenizer=tokenizer),
    './savedModels/ner'
)
