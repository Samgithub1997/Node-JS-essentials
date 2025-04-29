const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class UploadEmitter extends EventEmitter {}
const uploadEmitter = new UploadEmitter();

const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'sample.txt');

console.log(FILE_PATH);

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    console.log('Simulating file upload...');

    const readStream = fs.createReadStream(FILE_PATH);

    readStream.on('data', (chunk) => {
      console.log(`Uploading chunk of size ${chunk.length}`);
    });

    readStream.on('end', () => {
      console.log('Upload complete.');
      uploadEmitter.emit('fileUploaded', FILE_PATH); // trigger event
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Upload Successful!');
    });

    readStream.on('error', (err) => {
      console.error('Error during upload:', err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Upload Failed!');
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

uploadEmitter.on('fileUploaded', (filePath) => {
  console.log('Event triggered: fileUploaded');
  // after heavy I/O operation, setImmediate is called to process the file
  setImmediate(() => {
    try {
      console.log('Processing file...');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const lineCount = fileContent.split('\n').length;
      console.log(`Processing done: File has ${lineCount} lines.`);
    } catch (err) {
      console.error('Processing failed:', err.message);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
