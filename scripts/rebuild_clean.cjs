const fs = require('fs');
const path = require('path');

const b = fs.readFileSync(path.join(__dirname, 'build_portfolio.cjs'), 'utf8');

// 1. Check if src/data/projects.json exists
const projectsData = require('../src/data/projects.json');
const servicesData = require('../src/data/services.json');

// Find start of projectsDatabase
const start = b.indexOf('const projectsDatabase = {');
const end = b.indexOf('const projectDetailView = document.getElementById');
const beforeProjects = b.substring(0, start);
const afterProjects = b.substring(end);

// Also replace servicesDatabase
const srvStart = afterProjects.indexOf('const servicesDatabase = {');
const srvEnd = afterProjects.indexOf('const serviceDetailView = document.getElementById');
const beforeServices = afterProjects.substring(0, srvStart);
const afterServices = afterProjects.substring(srvEnd);

// Header with imports
let cleanBuild = `const fs = require('fs');
const path = require('path');

const heroB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_hero_opt.jpg')).toString('base64');
const aboutB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_about_opt.jpg')).toString('base64');
const brandB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_brand_opt.jpg')).toString('base64');

const projectsData = require('../src/data/projects.json');
const servicesData = require('../src/data/services.json');

`;

const htmlStartIdx = beforeProjects.indexOf('const htmlContent = `');
cleanBuild += beforeProjects.substring(htmlStartIdx);
cleanBuild += 'const projectsDatabase = ${JSON.stringify(projectsData, null, 2)};\n\n    ';
cleanBuild += beforeServices;
cleanBuild += 'const servicesDatabase = ${JSON.stringify(servicesData, null, 2)};\n\n    ';
cleanBuild += afterServices;

fs.writeFileSync(path.join(__dirname, 'build_portfolio.cjs'), cleanBuild, 'utf8');
console.log('Successfully restructured build_portfolio.cjs!');
