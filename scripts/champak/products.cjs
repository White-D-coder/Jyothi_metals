// Our catalog products, parsed straight from src/data/catalogData.ts so the
// pipeline has no generated-file dependency.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '../../src/data/catalogData.ts'), 'utf8');
const re = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*category:\s*'([^']+)',\s*subCat:\s*'([^']+)'/g;

const products = [];
let m;
while ((m = re.exec(src))) products.push({ id: m[1], title: m[2], category: m[3], subCat: m[4] });

module.exports = products;
