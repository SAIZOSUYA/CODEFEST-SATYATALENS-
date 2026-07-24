const axios = require('axios');

async function testFullAnalysis() {
  console.log('=== RUNNING FULL COMPREHENSIVE ANALYSIS ON MEDIA URL ===');
  const res = await axios.post('http://localhost:4000/api/verify-link', {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  });

  console.log('\n--- VERDICT ---');
  console.log('VERDICT:', res.data.aiResult?.verdict);
  
  console.log('\n--- FULL COMPREHENSIVE FORENSIC REPORT ---');
  console.log(res.data.aiResult?.raw);
}

testFullAnalysis();
