const fs = require('fs');
const svg = fs.readFileSync('public/images/Building.svg', 'utf-8');

// Find all tags in the SVG
const tags = svg.match(/<[a-zA-Z]+[^>]*>/g);
console.log('Total tags:', tags.length);

// Print first 50 tags
for (let i = 0; i < Math.min(50, tags.length); i++) {
  console.log(`${i}: ${tags[i]}`);
}
