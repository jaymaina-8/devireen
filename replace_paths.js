const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(process.cwd());
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/\/cms\//g, '/dashboard/')
    .replace(/@\/components\/cms\//g, '@/components/dashboard/')
    .replace(/'\/cms'/g, "'/dashboard'")
    .replace(/"\/cms"/g, '"/dashboard"')
    .replace(/`\/cms`/g, '`/dashboard`')
    .replace(/`\/cms\//g, '`/dashboard/');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    count++;
  }
});

console.log('Updated ' + count + ' files');
