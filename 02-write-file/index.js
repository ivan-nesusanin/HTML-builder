const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'file.txt');
fs.writeFile(filePath, '', (err) => {
  if (err) {
    throw err;
  }
});

const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
rl.question('Write your text!\n', (text) => {
  fs.appendFile(filePath, `${text}\n`, (err) => {
    if (err) {
      throw err;
    }
  });
  rl.on('line', (text) => {
    if (text.toLowerCase().trim() === 'exit') {
      rl.close();
    } else {
      fs.appendFile(filePath, `${text}\n`, (err) => {
        if (err) {
          throw err;
        }
      });
      rl.prompt;
    }
  });
});

rl.on('close', () => {
  console.log('God bless you!');
});
