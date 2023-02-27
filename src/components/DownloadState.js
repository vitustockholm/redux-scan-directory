import React from 'react';

const DownloadState = ({ files }) => {
  const handleDownloadState = () => {
    const fileData = JSON.stringify(files);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'file-state.json';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownloadState}>Download State</button>;
};

export default DownloadState;
