const fs = require('fs');
const path = require('path');

// Read the individual source files
const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'public', 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'public', 'game.js'), 'utf8');

// Combine them into a single HTML structure
// This assumes your original index.html has placeholders or you replace the tags
let combined = html
  // Replace <link rel="stylesheet" href="style.css"> with inline style
  .replace(
    /<link\s+rel=["']stylesheet["']\s+href=["']style\.css["']\s*\/?>/i, 
    `<style>\n${css}\n</style>`
  )
  // Replace <script src="game.js"></script> with inline script
  .replace(
    /<script\s+src=["']game\.js["']\s*><\/script>/i, 
    `<script>\n${js}\n</script>`
  );

// Create a 'dist' (distribution) folder for the final output
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Write the final single file
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), combined);
console.log('Successfully built single index.html!');
