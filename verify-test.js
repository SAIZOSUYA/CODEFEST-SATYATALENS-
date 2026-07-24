const axios = require('axios');
require('dotenv').config();

const geminiApiKey = (process.env.GEMINI_API_KEY || '').trim();
if (!geminiApiKey) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}

const prompt = 'Analyze the following URL: https://youtu.be/bgnZNjd9yv8?si=DNBiLCvo9ltGF0CK.\nCategory: video_or_audio.\nIf it is an AI-generated asset, answer AI_GENERATED. If it appears authentic, answer AUTHENTIC and provide a short explanation with source and upload date if available.';
const model = 'gemma-4-26b-a4b-it';
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiApiKey)}`;

(async () => {
  try {
    const response = await axios.post(endpoint, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });
    console.log('RESPONSE STATUS:', response.status);
    const resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('RESULT TEXT:\n', resultText);
  } catch (error) {
    console.error('ERROR STATUS:', error.response?.status);
    console.error('ERROR DATA:', JSON.stringify(error.response?.data, null, 2));
    console.error('ERROR MESSAGE:', error.message);
  }
})();

