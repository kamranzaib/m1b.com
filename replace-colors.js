const fs = require('fs');
const path = require('path');

// Path to your source directory
const directoryPath = './src';

// Color palette from the reference image - corrected
const replacements = [
  // Primary backgrounds
  { from: /bg-white/g, to: 'bg-[#D0D0D0]' },  // Light gray background
  { from: /bg-gray-100/g, to: 'bg-[#D0D0D0]' },
  { from: /bg-gray-50/g, to: 'bg-[#D0D0D0]' },
  { from: /bg-gray-800/g, to: 'bg-black' }, // Black for footer/dark sections
  
  // Icon backgrounds and accents
  { from: /bg-indigo-100/g, to: 'bg-[#E8E6DF]' }, // Cream for icon backgrounds
  { from: /bg-indigo-50/g, to: 'bg-[#E8E6DF]' },
  
  // Primary action colors
  { from: /bg-indigo-600/g, to: 'bg-black' }, // Black for buttons
  { from: /hover:bg-indigo-700/g, to: 'hover:bg-gray-800' }, // Dark gray on hover
  
  // Text and borders
  { from: /text-indigo-600/g, to: 'text-black' }, // Black text accents
  { from: /text-gray-900/g, to: 'text-black' }, // Primary text color
  { from: /text-gray-800/g, to: 'text-black' },
  { from: /text-gray-700/g, to: 'text-gray-800' }, 
  { from: /text-gray-600/g, to: 'text-gray-700' }, // Dark gray for secondary text
  
  // Borders
  { from: /border-indigo-500/g, to: 'border-black' },
  { from: /border-gray-300/g, to: 'border-gray-400' },
  { from: /border-gray-200/g, to: 'border-gray-400' },
  
  // Hover states
  { from: /hover:text-indigo-600/g, to: 'hover:text-gray-800' },
  
  // Shadows 
  { from: /shadow-md/g, to: 'shadow-md shadow-black/10' },
  { from: /shadow-lg/g, to: 'shadow-lg shadow-black/10' },
  
  // Form elements
  { from: /focus:ring-indigo-500/g, to: 'focus:ring-black' },
  
  // Dividers/accent lines
  { from: /bg-indigo-500/g, to: 'bg-black' },
];

// Function to walk through directories recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    
    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (stat.isFile() && (filepath.endsWith('.js') || filepath.endsWith('.jsx'))) {
      callback(filepath);
    }
  });
}

// Function to replace content in a file
function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let replaced = false;
  
  replacements.forEach(({from, to}) => {
    if (content.match(from)) {
      content = content.replace(from, to);
      replaced = true;
    }
  });
  
  if (replaced) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// Run the script
console.log('Starting modern monochrome theme conversion...');
walkDir(directoryPath, replaceInFile);
console.log('Theme conversion complete!');