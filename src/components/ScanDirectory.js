import React, { useState } from 'react';

const ScanDirectory = ({ scanDirectory }) => {
  const [directoryPath, setDirectoryPath] = useState('');

  const handleInputChange = (event) => {
    setDirectoryPath(event.target.value);
  };

  const handleScanDirectory = () => {
    scanDirectory(directoryPath);
  };

  return (
    <div>
      <input type="text" value={directoryPath} onChange={handleInputChange} />
      <button onClick={handleScanDirectory}>Scan Directory</button>
    </div>
  );
};

export default ScanDirectory;
