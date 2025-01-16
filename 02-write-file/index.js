const path = require('path');
const fileStream = require('fs');
const nameFile = path.join(__dirname, 'text.txt');
const writeStream = fileStream.createWriteStream(nameFile);
const { exit, stdin, stdout } = require('process');

stdout.write('\nHi! You can enter a message here!\n');
stdout.write('To end the message, press ctrl + C or write "exit"...\n');

stdin.on('data', (char) => {
  if (char.toString().trimEnd() === 'exit') {
    stdout.write('Bye! Write more! :)');
    exit();
  } else {
    writeStream.write(char);
  }
});

process.on('SIGINT', () => {
  stdout.write('Bye! Write more! :)');
  exit();
});
