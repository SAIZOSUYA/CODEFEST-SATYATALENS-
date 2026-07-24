const axios = require('axios');
require('dotenv').config();

async function runApiCall() {
  console.log('=== Step 1: Testing Public REST API Call ===');
  try {
    const publicRes = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Status:', publicRes.status);
    console.log('Response title:', publicRes.data.title);
  } catch (err) {
    console.error('Public API call error:', err.message);
  }

  console.log('\n=== Step 2: Testing Google Gemini / Gemma API with Provided Key ===');
  const geminiApiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!geminiApiKey) {
    console.log('No GEMINI_API_KEY set in .env');
    return;
  }

  const prompt = 'Analyze the following URL: https://youtu.be/bgnZNjd9yv8?si=DNBiLCvo9ltGF0CK.\nCategory: video_or_audio.\nIf it is an AI-generated asset, answer AI_GENERATED. If it appears authentic, answer AUTHENTIC and provide a short explanation with source and upload date if available.';

  const models = [
    'gemma-4-26b-a4b-it',
    'gemma-4-31b-it',
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.5-flash-lite'
  ];

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiApiKey)}`;
    try {
      console.log(`Calling model [${model}]...`);
      const res = await axios.post(endpoint, {
        contents: [{ parts: [{ text: prompt }] }]
      });
      console.log(`\n>>> API CALL SUCCESSFUL! (Model: ${model}, Status: ${res.status}) <<<`);
      const outputText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('\nAI Response:\n', outputText);
      return;
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.error?.message || err.message;
      console.log(`Model [${model}] failed (${status}): ${msg.split('\n')[0]}`);
    }
  }
}

runApiCall();
