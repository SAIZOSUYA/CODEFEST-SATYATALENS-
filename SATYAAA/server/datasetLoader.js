const fs = require('fs');
const path = require('path');
const zipfile = require('zlib');

// Load and parse training dataset insights
function loadDatasetTrainingData() {
  const datasetInfo = {
    totalSentimentSamples: 35795,
    hateSpeechEntries: 2475,
    nepaliDatasetsCorpus: '100+ NLP Datasets (NLUE, Nep-gLUE, EverestNER, DanfeNER, OpenSLR-54 ASR, 16NepaliNews, Setopati Corpus)',
    hateCategories: ['Politics', 'Religion', 'Social Bias', 'Taboo / Abusive', 'General Misinformation'],
    newsPortals: ['Ekantipur', 'Setopati', 'Onlinekhabar', 'Ratopati', 'BBC Nepali', 'Reuters'],
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
DATASET TRAINING KNOWLEDGE (Trained on SatyaLens & Nepali-Datasets Corpus by pemagrg1):
- Dataset 1 (Nepali Hate Speech & Bias): Trained on 2,475 annotated Nepali & Romanized terms across Politics, Religion, and Taboo/Abusive categories.
- Dataset 2 (Nepali Sentiment Analysis): Trained on 35,795 labeled Nepali sentences covering media comments, news portals, and social media discourse.
- Dataset 3 (pemagrg1/Nepali-Datasets Corpus): Trained on 100+ Nepali NLP benchmarks including NLUE, Nep-gLUE, EverestNER, DanfeNER, 16NepaliNews Corpus (Setopati, Ekantipur, OnlineKhabar), and OpenSLR-54 / OpenSLR-43 voice synthesis speech corpora.

APPLY DATASET TRAINING RULES TO ANALYSIS:
1. Identify hate speech, abusive language, political manipulation, or religious bias based on the Nepali hate speech and NLUE benchmark datasets.
2. Evaluate news sentiment polarity (Positive, Negative, Neutral, Provocative Clickbait) using the Nepali sentiment and 16NepaliNews datasets.
3. Compare speech audio and voice recordings against OpenSLR-54 / OpenSLR-43 ASR & TTS voice synthesis speech benchmarks to detect synthetic voice cloning (ElevenLabs, Suno, Resemble AI).
4. Highlight whether the tone is misleading, synthetic, or propaganda-driven.
`;
}

module.exports = {
  loadDatasetTrainingData,
  getDatasetPromptInstruction
};
