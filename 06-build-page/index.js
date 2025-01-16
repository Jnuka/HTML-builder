const fileStream = require('fs');
const pathFiles = require('path');

const nameFile = pathFiles.join(__dirname, 'assets');
const nameFileCopy = pathFiles.join(__dirname, 'project-dist', 'assets');

fileStream.rm(
  pathFiles.join(__dirname, 'project-dist'),
  { recursive: true },
  () => {
    fileStream.mkdir(nameFileCopy, { recursive: true }, () => {
      directoryCopy(nameFileCopy, nameFile);
      htmlBuilder();
      styleBuilder();
    });
  },
);

function directoryCopy(nameFileCopy, nameFile) {
  fileStream.rm(nameFileCopy, { recursive: true }, () => {
    fileStream.mkdir(nameFileCopy, { recursive: true }, () => {
      fileStream.readdir(nameFile, { withFileTypes: true }, (error, files) => {
        if (error) {
          return console.log(error);
        }
        files.forEach((file) => {
          const nameFileInnner = pathFiles.join(nameFile, file.name);
          const nameFileCopyInnner = pathFiles.join(nameFileCopy, file.name);
          if (file.isFile()) {
            fileStream.copyFile(nameFileInnner, nameFileCopyInnner, () => {});
          } else {
            directoryCopy(nameFileCopyInnner, nameFileInnner);
          }
        });
      });
    });
  });
}

function htmlBuilder() {
  const folderComponents = pathFiles.join(__dirname, 'components');
  const folderProjectHtml = pathFiles.join(
    __dirname,
    'project-dist',
    'index.html',
  );
  const nameHtml = pathFiles.join(__dirname, 'template.html');
  const readableStreamHtml = fileStream.createReadStream(nameHtml);

  let htmlTemplate = '';
  readableStreamHtml.on('data', (chunk) => {
    htmlTemplate += chunk;
    fileStream.readdir(
      folderComponents,
      { withFileTypes: true },
      (error, files) => {
        if (error) {
          return console.log(error);
        }
        files
          .filter((file) => file.isFile())
          .filter((file) => pathFiles.extname(file.name) === '.html')
          .forEach((file) => {
            fileStream.readFile(
              pathFiles.join(__dirname, 'components', file.name),
              (error, style) => {
                if (error) {
                  return console.log(error);
                }
                htmlTemplate = htmlTemplate.replace(
                  `{{${file.name.toString().split('.').slice(0, -1)}}}`,
                  style,
                );
                const writebleStreamStyle =
                  fileStream.createWriteStream(folderProjectHtml);
                writebleStreamStyle.write(`${htmlTemplate}\n`);
              },
            );
          });
      },
    );
  });
}

function styleBuilder() {
  const folderAssets = pathFiles.join(__dirname, 'styles');
  const folderProjectStyle = pathFiles.join(
    __dirname,
    'project-dist',
    'style.css',
  );

  fileStream.readdir(folderAssets, { withFileTypes: true }, (error, files) => {
    if (error) {
      return console.log(error);
    }
    const writebleStreamStyle =
      fileStream.createWriteStream(folderProjectStyle);
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
            writebleStreamStyle.write(`${style}\n`);
          },
        );
      });
  });
}
