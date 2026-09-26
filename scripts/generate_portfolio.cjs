const fs = require('fs');
const path = require('path');

const heroB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_hero_opt.jpg')).toString('base64');
const aboutB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_about_opt.jpg')).toString('base64');
const brandB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_brand_opt.jpg')).toString('base64');

// Read the existing build script to preserve everything, while seamlessly injecting the projectDetailView CSS, HTML, and JS
const existingScript = fs.readFileSync(path.join(__dirname, 'build_portfolio.cjs'), 'utf8');

console.log('Existing build script loaded, size:', existingScript.length);
