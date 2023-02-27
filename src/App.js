// // Import required packages
// import React, { useState, useEffect } from 'react';
// import { createStore } from 'redux';
// import axios from 'axios';

// // Define the initial state of the app
// const initialState = {
//   files: [],
// };

// // Define the reducer function to handle state changes
// function fileReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'SCAN_DIRECTORY':
//       // Read the directory and update the state with the list of files
//       const newFiles = action.files.map((fileName) => ({
//         name: fileName,
//         active: true,
//       }));
//       return {
//         ...state,
//         files: newFiles,
//       };
//     case 'MARK_INACTIVE_FILES':
//       // Mark any files in the state that are no longer in the directory as inactive
//       const updatedFiles = state.files.map((file) => {
//         if (action.files.includes(file.name)) {
//           return file;
//         } else {
//           return {
//             ...file,
//             active: false,
//           };
//         }
//       });
//       return {
//         ...state,
//         files: updatedFiles,
//       };
//     default:
//       return state;
//   }
// }

// // Create the Redux store with the reducer and initial state
// const store = createStore(fileReducer);

// // Define the App component
// function App() {
//   const [files, setFiles] = useState([]);

//   // Define the functions to handle the directory scan and mark inactive files actions
//   const scanDirectory = () => {
//     axios
//       .post('http://127.0.0.1:3000/scan', { path: '/path/to/directory' })
//       .then(() => {
//         console.log('Directory scanned');
//       });
//   };

//   const markInactiveFiles = () => {
//     axios
//       .post('http://127.0.0.1:3000/mark-inactive', {
//         path: '/path/to/directory',
//       })
//       .then(() => {
//         console.log('Inactive files marked');
//       });
//   };

//   // Subscribe to changes to the Redux store and update the component state when the files state changes
//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => {
//       setFiles(store.getState().files);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>File List</h1>
//       <ul>
//         {files.map((file) => (
//           <li key={file.name}>
//             {file.name} - {file.active ? 'Active' : 'Inactive'}
//           </li>
//         ))}
//       </ul>
//       <button onClick={scanDirectory}>Scan Directory</button>
//       <button onClick={markInactiveFiles}>Mark Inactive Files</button>
//     </div>
//   );
// }

// export default App;
////////////////////////////

// App.js

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { scanDirectory, updateState, downloadState } from './actions';

const App = ({
  files,
  scanDirectory,
  updateState,
  directoryPath,
  downloadState,
}) => {
  useEffect(() => {
    scanDirectory(directoryPath);
  }, [directoryPath]);

  const handleRescan = () => {
    scanDirectory(directoryPath);
  };

  const handleDownloadState = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(files));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'file_state.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div>
      <h1>File List:</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} - {file.active ? 'Active' : 'Inactive'}
          </li>
        ))}
      </ul>
      <button onClick={handleRescan}>Rescan Directory</button>
      <button onClick={handleDownloadState}>Download State</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  directoryPath: state.directoryPath,
});

export default connect(mapStateToProps, {
  scanDirectory,
  updateState,
  downloadState,
})(App);
