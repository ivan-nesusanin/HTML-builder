const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'file.txt');
fs.writeFile(filePath, '', ()=>{});

const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
rl.question('Write your text!\n', text => {
  fs.appendFile(filePath, `${text}\n`, ()=>{});
  rl.on('line', text => {
    if (text.toLowerCase().trim() === 'exit') {
      rl.close();
    } else {
      fs.appendFile(filePath, `${text}\n`, ()=>{});
      rl.prompt;
    }
  })
});

rl.on('close', () => {
  console.log('God bless you!');
})