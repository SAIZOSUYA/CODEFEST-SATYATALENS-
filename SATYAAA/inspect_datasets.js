const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'Train', 'sentiment_analysis_nepali_final.csv', 'sentiment_analysis_nepali_final.csv');

if (fs.existsSync(csvPath)) {
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split('\n');
  console.log('--- CSV DATASET HEADER & SAMPLE LINES ---');
  console.log('Total Lines:', lines.length);
  console.log('Header:', lines[0]);
  console.log('Sample Line 1:', lines[1]);
  console.log('Sample Line 2:', lines[2]);
  console.log('Sample Line 3:', lines[3]);
  console.log('Sample Line 4:', lines[4]);
  console.log('Sample Line 5:', lines[5]);
} else {
  console.log('CSV file not found at:', csvPath);
}
