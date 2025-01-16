const fileStream = require('fs');
const path = require('path');
const nameFile = path.join(__dirname, 'text.txt');
const readStream = fileStream.createReadStream(nameFile);

let message = '';
readStream.on('data', (char) => (message += char));
readStream.on('end', () => console.log(message));
readStream.on('error', (error) => console.log('Error', error.message));
