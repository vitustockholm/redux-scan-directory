const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const directoryPath = '/';

const getFiles = () => {
  const files = fs.readdirSync(directoryPath);
  return files.map((file) => ({
    name: file,
    active: true,
  }));
};

let files = getFiles();

app.get('/list', (req, res) => {
  res.send(files);
});

app.get('/scan', (req, res) => {
  files = getFiles();
  res.send({ message: 'Directory scanned successfully' });
});

app.get('/download-state', (req, res) => {
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(files));
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="file_state.json"'
  );
  res.send(dataStr);
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
