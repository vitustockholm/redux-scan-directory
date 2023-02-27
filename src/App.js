
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, scanDirectory, updateFiles } from './actions';

const App = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files);
  const directoryPath = useSelector((state) => state.directoryPath);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const handleRescan = () => {
    dispatch(scanDirectory(directoryPath));
  };

  const handleDownloadState = () => {
    const dataStr = JSON.stringify(files);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataUri);
    downloadAnchorNode.setAttribute('download', 'file_state.json');
    document.body.appendChild(downloadAnchorNode);
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

export default App;
