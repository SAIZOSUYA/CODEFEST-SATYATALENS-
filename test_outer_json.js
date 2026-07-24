const axios = require('axios');

async function testOuterJson() {
  console.log('--- TESTING OUTER JSON EXTRACTOR ---');
  const res = await axios.post('http://localhost:4000/api/verify-link', {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  });
  console.log('JSON returned:', !!res.data.aiResult?.json);
  if (res.data.aiResult?.json) {
    console.log('Keys in JSON:', Object.keys(res.data.aiResult.json));
  }
}

testOuterJson();
