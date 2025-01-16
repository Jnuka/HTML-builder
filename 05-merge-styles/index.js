const fileStream = require('fs');
const pathFiles = require('path');

const nameFile = pathFiles.join(__dirname, 'styles');
const bundleFile = pathFiles.join(__dirname, 'project-dist', 'bundle.css');

const writebleStreamBundle = fileStream.createWriteStream(bundleFile);

fileStream.readdir(nameFile, { withFileTypes: true }, (error, files) => {
  if (error) {
    return console.log(error);
  }
  files
    .filter((file) => file.isFile())
    .filter((file) => pathFiles.extname(file.name) === '.css')
    .forEach((file) => {
      fileStream.readFile(
        pathFiles.join(__dirname, 'styles', file.name),
        (error, style) => {
          if (error) {
            return console.log(error);
          }
          writebleStreamBundle.write(`${style}\n`);
        },
      );
    });
});
