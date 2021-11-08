const path = require('path');
const fs = require('fs');

const pathDir = path.join(__dirname, 'secret-folder');
fs.readdir(pathDir, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach(file => {
      if (file.isFile()) {
        const arr = file.name.split('.');
        fs.stat(`${pathDir}\\${file.name}`, (err, stats) => {
          if (err) throw err;
          console.log(`${arr[0]} - ${arr[1]} - ${stats.size / 1024}kb`);
        });
      }
    });
  }
});