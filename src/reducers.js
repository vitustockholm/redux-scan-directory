// import { combineReducers } from 'redux';
// import { SCAN_DIRECTORY, UPDATE_STATE, DOWNLOAD_STATE } from './actions';

// const initialState = {
//   files: [],
// };

// function filesReducer(state = initialState.files, action) {
//   switch (action.type) {
//     case SCAN_DIRECTORY:
//       return action.payload.map((file) => ({ name: file, active: true }));
//     case UPDATE_STATE:
//       const activeFiles = action.payload.map((file) => file.name);
//       return state.map((file) => ({
//         name: file.name,
//         active: activeFiles.includes(file.name),
//       }));
//     case DOWNLOAD_STATE:
//       return state;
//     default:
//       return state;
//   }
// }

// const reducer = combineReducers({
//   files: filesReducer,
// });

// export default reducer;
////////////////////
// reducers.js
import { combineReducers } from 'redux';
import { SCAN_DIRECTORY, UPDATE_STATE, DOWNLOAD_STATE } from './actions';

const initialState = {
  files: [],
};

function filesReducer(state = initialState.files, action) {
  switch (action.type) {
    case SCAN_DIRECTORY:
      return action.payload.map((file) => ({ name: file, active: true }));
    case UPDATE_STATE:
      const activeFiles = action.payload.map((file) => file.name);
      return state.map((file) => ({
        name: file.name,
        active: activeFiles.includes(file.name),
      }));
    case DOWNLOAD_STATE:
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  files: filesReducer,
});

export default rootReducer;
