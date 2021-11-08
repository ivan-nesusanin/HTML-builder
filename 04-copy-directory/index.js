const path = require('path');
const fs = require('fs');

const pathSrcDir = path.join(__dirname, 'files');
const pathDestDir = path.join(__dirname, 'files-copy');

fs.mkdir(pathDestDir, { recursive: true }, err => {
  if (err) throw err;
})

fs.readdir(pathDestDir, 'utf-8', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.rm(`${pathDestDir}\\${file}`, err => {
      if (err) throw err;
    })
  });
});

setTimeout(() => {
  fs.readdir(pathSrcDir, 'utf-8', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(`${pathSrcDir}\\${file}`, `${pathDestDir}\\${file}`, err => {
        if (err)
          throw err;
      });
    });
  });
}, 2000);
