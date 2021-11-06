const path = require('path');
const fs = require('fs');
let arrForBundle = [];

const pathDir = path.join(__dirname, 'styles');
const pathBundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
fs.writeFile(pathBundleFile, '', (err) => {
  if (err) throw err;
});

fs.readdir(pathDir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    let pathCssFile = path.join(__dirname, 'styles', `${file.name}`);
    if (file.isFile() && path.extname(`${file.name}`) === '.css') {
      fs.readFile(pathCssFile, 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(pathBundleFile, data, (err) => {
          if (err) throw err;
        });
        // arrForBundle.push(data.toString());
      });
    }
  });
});

// fs.appendFile(pathBundleFile, arrForBundle, (err) => {
//   if (err) throw err;
// });
