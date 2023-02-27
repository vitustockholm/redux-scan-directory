const initialState = {
  files: [],
  directoryPath: '/mycomputer',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FILES_SUCCESS':
      return { ...state, files: action.payload };
    case 'UPDATE_FILES':
      return { ...state, files: action.payload };
    default:
      return state;
  }
};

export default reducer;
