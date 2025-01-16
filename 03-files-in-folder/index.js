const fileStream = require('fs');
const pathFiles = require('path');
const nameFile = pathFiles.join(__dirname, 'secret-folder');

fileStream.readdir(nameFile, { withFileTypes: true }, (error, files) => {
  if (error) {
    return console.log(error);
  }

  files
    .filter((file) => file.isFile())
    .forEach((file) => {
      fileStream.stat(
        pathFiles.join(__dirname, 'secret-folder', file.name),
        (error, fileStat) => {
          if (error) {
            return console.log(error);
          }

          let fileExtention = pathFiles.extname(file.name);
          let fileName = file.name.replace(fileExtention, '');
          let fileSize = fileStat.size / 1024;

          console.log(
            `${fileName} - ${fileExtention.slice(1)} - ${fileSize}kb`,
          );
        },
      );
    });
});
