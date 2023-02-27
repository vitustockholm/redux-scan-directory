
To start App:

    git clone  this_repo_url.git)
    npm i       (install dependencies)
    node server.js (runs the server on localhost:3001)
    npm start  (runs frontend cra app)
    *change defined directory patch for scan it
    
    Routes: /list , /scan, /download-state

Libs i used in this CRA project: 
npm install express redux body-parser cors redux-thunk

Like always TO DO : 

decode downloaded-state from %%%% 

import fs from 'fs'; <br />import path from 'path';<br /> import { promisify } from 'util';

const readdir = promisify(fs.readdir);<br /> const stat = promisify(fs.stat);<br />
// Update with your desired directory path
const dirPath = __dirname; <br />
const isDirectory = async (path) => (await stat(path)).isDirectory();<br />

const getDirectoryContents = async (dir) => { const files = await readdir(dir); <br />

const contents = await Promise.all( files.map(async (file) => { const filePath = path.join(dir, file); <br />

if (await isDirectory(filePath)) { return { name: file, active: true };<br />
} return { name: file, active: true }; })<br /><br />
// promisify function to convert the Node.js callback-style functions fs.readdir and fs.stat into Promise-based functions. 
// move the directory path into a variable named dirPath and replaced the hardcoded path in the original code. 
// async/await to make the code more readable and avoid callback hell. 
// created a new function called getDirectoryContents that takes a directory path and returns a Promise that resolves to an array of objects representing the directory's contents (subdirectories and files).
// replaced the hardcoded files variable with the result of calling the getDirectoryContents function with the dirPath variable. 
//update the response to set the appropriate headers and send the dataStr variable.

); return contents; };

app.get('/download-state', async (req, res) => { const files = await getDirectoryContents(dirPath);
const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(files));
res.setHeader( 'Content-Disposition', 'attachment; filename="file_state.json"' ); res.send(dataStr); }); 
