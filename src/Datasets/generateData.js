const fs = require('fs');
const path = require('path');

// Load the existing data
const filePath = path.join(__dirname, 'defaultData10KData.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Function to generate new records
function generateRecords(baseData, numRecords) {
  const newData = [];
  const baseLength = baseData.length;
  for (let i = 0; i < numRecords; i++) {
    const record = { ...baseData[i % baseLength] };
    record.name = `State${i + 1}`;
    record.code = `S${(i + 1).toString().padStart(4, '0')}`;
    record.capital = `Capital${i + 1}`;
    record.rating = (i % 50) + 1;
    record.population = (i + 1) * 1000;
    record.date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    newData.push(record);
  }
  return newData;
}

// Generate 10,000 records
const newData = generateRecords(data, 20000);

// Save the new data to a file
fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
console.log('Data generated successfully.');
