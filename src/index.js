import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';

const rootElement = document.getElementById('root');
const store = createStore(rootReducer, applyMiddleware(thunk));
// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
