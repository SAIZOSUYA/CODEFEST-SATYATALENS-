const axios = require('axios');

async function testPriority() {
  console.log('=== TEST 1: Authentic Real-World Video (Rick Astley Official) ===');
  const res1 = await axios.post('http://localhost:4000/api/verify-link', {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  });
  console.log('RESULT 1 VERDICT:', res1.data.aiResult?.verdict);
  console.log('RESULT 1 SOURCE:', res1.data.aiResult?.json?.publisherSource);

  console.log('\n=======================================================\n');

  console.log('=== TEST 2: AI Synthetic Sora Video ===');
  const res2 = await axios.post('http://localhost:4000/api/verify-link', {
    url: 'https://sora.com/gallery/cat-in-space-ai-generated-sora-video'
  });
  console.log('RESULT 2 VERDICT:', res2.data.aiResult?.verdict);
}

testPriority();
