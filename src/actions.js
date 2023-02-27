// export const updateState = (files) => ({
//   type: 'UPDATE_STATE',
//   payload: files,
// });

// export const scanDirectory = (path) => ({
//   type: 'SCAN_DIRECTORY',
//   payload: path,
// });
// App.js
// actions.js

export const SCAN_DIRECTORY = 'SCAN_DIRECTORY';
export const UPDATE_STATE = 'UPDATE_STATE';
export const DOWNLOAD_STATE = 'DOWNLOAD_STATE';

export const scanDirectory = (directoryPath) => {
  return (dispatch) => {
    fetch(`/scan?directoryPath=${directoryPath}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: SCAN_DIRECTORY,
          payload: data.files.map((file) => ({
            name: file,
            active: true,
          })),
        });
      })
      .catch((err) => console.error(err));
  };
};

export const updateState = (files) => {
  return {
    type: UPDATE_STATE,
    payload: files,
  };
};

export const downloadState = () => {
  return (dispatch, getState) => {
    const state = getState().files;
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'file_state.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    dispatch({ type: DOWNLOAD_STATE });
  };
};
