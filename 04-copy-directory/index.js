const fileStream = require('fs');
const pathFiles = require('path');

const nameFile = pathFiles.join(__dirname, 'files');
const nameFileCopy = pathFiles.join(__dirname, 'files-copy');

fileStream.rm(nameFileCopy, { recursive: true }, () => {
  fileStream.mkdir(nameFileCopy, { recursive: true }, () => {
    fileStream.readdir(nameFile, { withFileTypes: true }, (error, files) => {
      if (error) {
        return console.log(error);
      }

      files
        .filter((file) => file.isFile())
        .forEach((file) => {
          fileStream.copyFile(
            pathFiles.join(__dirname, 'files', file.name),
            pathFiles.join(__dirname, 'files-copy', file.name),
            () => {},
          );
        });
    });
  });
});
