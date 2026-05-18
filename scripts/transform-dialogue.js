// Transform the dialogue article: replace indented SHE/HE with styled speaker markers
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const FILE = '译坊-i-批判性的疏离or批判性的切近-拉图尔.md';
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'post');
const IMG_BASE = '/img/content/译坊-i-批判性的疏离or批判性的切近-拉图尔';

const filePath = path.join(CONTENT_DIR, FILE);
const raw = fs.readFileSync(filePath, 'utf-8');
const parsed = matter(raw);

let body = parsed.content;

// Replace 4-space indented SHE/HE markers with styled HTML speaker labels
// Pattern: "    SHE\n\n" or "    HE   \n\n"
// Each speaker label becomes a styled div with icon

// SHE marker: "    SHE\n\n"
body = body.replace(/ {4}SHE\n\n/g,
  `<p class="dlg-speaker dlg-she"><img src="${IMG_BASE}/she.png" alt="" class="dlg-avatar">&nbsp;SHE</p>\n\n`);

// HE marker: "    HE   \n\n" or "    HE\n\n"
body = body.replace(/ {4}HE *\n\n/g,
  `<p class="dlg-speaker dlg-he"><img src="${IMG_BASE}/he.png" alt="" class="dlg-avatar">&nbsp;HE</p>\n\n`);

// Wrap dialogue turns: each speaker block + following text in a div
// A dialogue turn is: <p class="dlg-speaker">...</p>\n\n<text until next speaker or end>
// We'll use sections for styling

const newRaw = matter.stringify(body, parsed.data);
fs.writeFileSync(filePath, newRaw, 'utf-8');

console.log('Transformed dialogue markers with speaker icons.');

// Count transformations
const sheCount = (body.match(/dlg-she/g) || []).length;
const heCount = (body.match(/dlg-he/g) || []).length;
console.log(`SHE markers: ${sheCount}, HE markers: ${heCount}`);
