const fs = require('fs');
let svg = fs.readFileSync('public/images/Building.svg', 'utf-8');

// Remove pattern and image tags to clean up the content and avoid base64 data
svg = svg.replace(/<pattern[\s\S]*?<\/pattern>/gi, '<!-- [PATTERN REMOVED] -->');
svg = svg.replace(/<image[\s\S]*?\/>/gi, '<!-- [IMAGE REMOVED] -->');

fs.writeFileSync('scratch/CleanBuilding.svg', svg);
console.log('Cleaned SVG written to scratch/CleanBuilding.svg. Size:', svg.length);
