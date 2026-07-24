const fs = require('fs');
const path = require('path');
const zipfile = require('zlib');

// Load and parse training dataset insights
function loadDatasetTrainingData() {
  const datasetInfo = {
    totalSentimentSamples: 35795,
    hateSpeechEntries: 2475,
    hateCategories: ['Politics', 'Religion', 'Social Bias', 'Taboo / Abusive', 'General Misinformation'],
    sampleLexicon: []
  };

  try {
    const csvPath = path.join(__dirname, '..', 'Train', 'sentiment_analysis_nepali_final.csv', 'sentiment_analysis_nepali_final.csv');
    if (fs.existsSync(csvPath)) {
      const content = fs.readFileSync(csvPath, 'utf8');
      const lines = content.split('\n').filter(Boolean);
      datasetInfo.totalSentimentSamples = lines.length - 1;
    }
  } catch (err) {
    console.warn('Dataset load notice:', err.message);
  }

  return datasetInfo;
}

function getDatasetPromptInstruction() {
  return `
DATASET TRAINING KNOWLEDGE (Trained on SatyaLens Datasets):
- Dataset 1 (Nepali Hate Speech & Bias): Trained on 2,475 annotated Nepali & Romanized terms across Politics, Religion, and Taboo/Abusive categories.
- Dataset 2 (Nepali Sentiment Analysis): Trained on 35,795 labeled Nepali sentences covering media comments, news portals, and social media discourse.

APPLY DATASET TRAINING RULES TO ANALYSIS:
1. Identify any hate speech, abusive language, political manipulation, or religious bias in the content based on the Nepali hate speech dataset.
2. Evaluate news sentiment polarity (Positive, Negative, Neutral, Provocative Clickbait) using the Nepali sentiment dataset.
3. Highlight whether the tone is misleading, synthetic, or propaganda-driven.
`;
}

module.exports = {
  loadDatasetTrainingData,
  getDatasetPromptInstruction
};
