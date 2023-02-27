export const fetchFiles = () => async (dispatch) => {
  try {
    const response = await fetch('/list');
    const data = await response.json();
    dispatch({ type: 'FETCH_FILES_SUCCESS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const scanDirectory = (directoryPath) => async (dispatch) => {
  try {
    const response = await fetch(`/scan?path=${directoryPath}`);
    const data = await response.json();
    dispatch(updateFiles(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateFiles = (files) => ({
  type: 'UPDATE_FILES',
  payload: files,
});

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
    dispatch({ type: 'DOWNLOAD_STATE' });
  };
};
