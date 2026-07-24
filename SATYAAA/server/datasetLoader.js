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
DATASET TRAINING & FORENSIC KNOWLEDGE BASE (SatyaLens & Nepali-Datasets Corpus by pemagrg1):
- Dataset 1 (Nepali Hate Speech & Bias): 2,475 annotated Nepali & Romanized terms across Politics, Religion, and Abusive/Taboo categories.
- Dataset 2 (Nepali Sentiment Analysis): 35,795 labeled Nepali sentences covering media comments, news portals, and social media discourse.
- Dataset 3 (pemagrg1/Nepali-Datasets Corpus): 100+ Nepali NLP benchmarks including NLUE, Nep-gLUE, EverestNER, DanfeNER, 16NepaliNews Corpus (Setopati, Ekantipur, OnlineKhabar), and OpenSLR-54 / OpenSLR-43 voice synthesis speech corpora.

MASTER AI VS REALITY FORENSIC DETECTION MATRIX:

1. COMPREHENSIVE AI & SYNTHETIC MEDIA SIGNALS (When AI is detected -> Remark as "AI_GENERATED" / "AI"):
   - Visual Neural Fingerprints: Latent diffusion noise, plastic/wax skin subsurface scattering absence, background line warping/melting (Midjourney, DALL-E 3, Stable Diffusion XL/3).
   - Video Temporal Defects: Fine texture flickering, fluid dynamics physics violations, morphing background objects (Sora, Runway Gen-2, Pika, Kling AI, Luma Dream Machine).
   - Anatomical Anomalies: Pupil asymmetry, specular catchlight angle drift, fused fingers, ear helix deformities, merged teeth boundaries.
   - Audio Vocoder Artifacts: Phase continuity breaks, robotic formant smoothing, missing physiological breath pauses, artificial room tone absence (ElevenLabs, Suno v3, Udio, Resemble AI, Bark).
   - OpenSLR Benchmark: Formant unnaturalness compared against OpenSLR-54 / OpenSLR-43 Nepali speech ASR/TTS corpora.

2. COMPREHENSIVE REALITY SIGNALS (When Real is detected -> Remark as "REAL"):
   - Biological Dynamics: Natural blink frequency (~12-20 blinks/min), organic skin pore micro-textures, authentic ocular reflection physics.
   - Optical Camera Physics: Coherent cast shadow directions matching studio lighting, consistent lens distortion, natural shutter motion blur.
   - Audio Spectrum Purity: Continuous natural room impulse response (RIR), natural viseme-phoneme sync (<15ms tolerance), unmanipulated room acoustics.
   - Provenance Verification: Alignment with 16NepaliNews archives (Ekantipur, Setopati, Onlinekhabar, Ratopati, BBC Nepali, Reuters).

3. MANDATORY REMARK RULE:
   - If AI or voice cloning is detected, "verdict" MUST be "AI_GENERATED" or "AI", "primary_evidence" MUST explicitly begin with "AI-GENERATED SYNTHETIC MEDIA DETECTED:", and "detected_artifacts" MUST list specific neural faults.
   - If authentic optical/acoustic capture is detected, "verdict" MUST be "REAL" and "primary_evidence" MUST detail biological and optical consistency.
`;
}

module.exports = {
  loadDatasetTrainingData,
  getDatasetPromptInstruction
};
