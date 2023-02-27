import React from 'react';

const ListFiles = ({ files }) => {
  return (
    <ul>
      {files.map((file) => (
        <li key={file.id}>{file.name}</li>
      ))}
    </ul>
  );
};

export default ListFiles;
