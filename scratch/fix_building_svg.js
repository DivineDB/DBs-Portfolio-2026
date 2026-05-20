const fs = require('fs');
let svg = fs.readFileSync('public/images/Building.svg', 'utf-8');

// Replace the filter group with a clean group
svg = svg.replace('<g filter="url(#filter0_d_171_47)">', '<g>');

fs.writeFileSync('public/images/Building.svg', svg);
console.log('Successfully updated public/images/Building.svg to remove the drop shadow filter group.');
