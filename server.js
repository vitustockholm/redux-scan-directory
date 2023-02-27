const express = require('express');
const fs = require('fs');
const { createStore } = require('redux');

// Define the initial state of the app
const initialState = {
  files: [],
};

// Define the reducer function to handle state changes
function fileReducer(state = initialState, action) {
  switch (action.type) {
    case 'SCAN_DIRECTORY':
      // Read the directory and update the state with the list of files
      const fileNames = fs.readdirSync(action.path);
      const newFiles = fileNames.map((fileName) => ({
        name: fileName,
        active: true,
      }));
      return {
        ...state,
        files: newFiles,
      };
    case 'MARK_INACTIVE_FILES':
      // Mark any files in the state that are no longer in the directory as inactive
      const updatedFiles = state.files.map((file) => {
        if (fs.existsSync(`${action.path}/${file.name}`)) {
          return file;
        } else {
          return {
            ...file,
            active: false,
          };
        }
      });
      return {
        ...state,
        files: updatedFiles,
      };
    default:
      return state;
  }
}

// Create the Redux store with the reducer and initial state
const store = createStore(fileReducer);

// Define the express app and middleware
const app = express();
app.use(express.json());

// Define the endpoints
app.get('/list', (req, res) => {
  res.json(store.getState().files);
});

app.post('/scan', (req, res) => {
  const { path } = req.body;
  store.dispatch({ type: 'SCAN_DIRECTORY', path });
  res.send('Directory scanned');
});

app.post('/mark-inactive', (req, res) => {
  const { path } = req.body;
  store.dispatch({ type: 'MARK_INACTIVE_FILES', path });
  res.send('Inactive files marked');
});

app.get('/download-state', (req, res) => {
  res.json(store.getState().files);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
