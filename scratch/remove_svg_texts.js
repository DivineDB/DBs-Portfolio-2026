const fs = require('fs');
let svg = fs.readFileSync('public/images/Building.svg', 'utf-8');

// The paths we want to remove:
// 1. "Hire Me" text path (starts with d="M409.556 789.6)
// 2. "other things" text path (starts with d="M179.54 747.09)
// 3. "Selected Work" text path (starts with d="M385.648 391.168)
// 4. "About Me" text path (starts with d="M179.18 391)
// 5. Window 1 hover path (starts with d="M362 713C362 711.343 363.343 710 365 710H484)
// 6. Window 2 hover path (starts with d="M145 713C145 711.343 146.343 710 148 710H267)
// 7. Window 3 hover path (starts with d="M362 373C362 371.343 363.343 370 365 370H481)
// 8. Window 4 hover path (starts with d="M148 369C148 367.343 149.343 366 151 366H267)

const prefixesToRemove = [
  'd="M409.556 789.6',
  'd="M179.54 747.09',
  'd="M385.648 391.168',
  'd="M179.18 391',
  'd="M362 713C362 711.343',
  'd="M145 713C145 711.343',
  'd="M362 373C362 371.343',
  'd="M148 369C148 367.343'
];

// Let's split svg into lines and filter out any line containing these prefixes
const lines = svg.split(/\r?\n/);
let removedCount = 0;
const filteredLines = lines.filter(line => {
  const shouldRemove = prefixesToRemove.some(prefix => line.includes(prefix));
  if (shouldRemove) {
    removedCount++;
    return false;
  }
  return true;
});

if (removedCount > 0) {
  fs.writeFileSync('public/images/Building.svg', filteredLines.join('\n'));
  console.log(`Successfully removed ${removedCount} interactive paths and text paths from public/images/Building.svg.`);
} else {
  console.log('No matching paths found to remove in the main SVG file.');
}
