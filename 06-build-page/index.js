const fs = require('fs');
const path = require('path');

// создаем папку project-dist
const pathProjectDir = path.join(__dirname, 'project-dist');
fs.mkdir(pathProjectDir, { recursive: true }, (err) => {
  if (err) throw err;
});

const pathHtmlFile = path.join(__dirname, 'project-dist', 'index.html');
const pathTemplateFile = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');

// собираем index.html
fs.readFile(pathTemplateFile, 'utf-8', (err, data) => {
  if (err) throw err;
  const regExp = /{{\w*}}/gi;
  const patterns = data.match(regExp);
  patterns.forEach((pattern) => {
    const pathHtmlComponent = path.join(pathComponents, `${pattern.slice(2, -2)}.html`);
    fs.readFile(pathHtmlComponent, 'utf-8', (err, htmlComponent) => {
      if (err) throw err;
      data = data.replace(pattern, htmlComponent);
      setTimeout(() => {
        fs.writeFile(pathHtmlFile, data, ()=>{});
      }, 2000);
    });
  });
});


// собираем style.css
const pathStyleDir = path.join(__dirname, 'styles');
const pathStyleFile = path.join(__dirname, 'project-dist', 'style.css');
fs.writeFile(pathStyleFile, '', (err) => {
  if (err) throw err;
});

fs.readdir(pathStyleDir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    let pathCssFile = path.join(__dirname, 'styles', `${file.name}`);
    if (file.isFile() && path.extname(`${file.name}`) === '.css') {
      fs.readFile(pathCssFile, 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(pathStyleFile, `${data}\n`, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});

// копируем assets
const pathProjectAssets = path.join(__dirname, 'project-dist', 'assets');
fs.mkdir(pathProjectAssets, { recursive: true }, (err) => {
  if (err) throw err;
});

const pathAssets = path.join(__dirname, 'assets');

fs.readdir(pathAssets, {withFileTypes: true}, (err, folders) => {
  folders.forEach(folder => {
    const pathProjectAssetsFolder = path.join(pathProjectAssets, folder.name);
    fs.mkdir(pathProjectAssetsFolder, { recursive: true }, ()=>{});
    fs.readdir(path.join(pathAssets, folder.name), 'utf-8', (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        const pathProjectAssetsFolderFile = path.join(pathProjectAssetsFolder, file);
        fs.copyFile(path.join(pathAssets, folder.name, file), pathProjectAssetsFolderFile, ()=>{});
      })
    })
  })
})