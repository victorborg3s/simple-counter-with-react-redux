import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from './rootReducer';
import reportWebVitals from './reportWebVitals';
import './index.css';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const loadState = () => {
  try {
      const serializedState = localStorage.getItem('simple-counter-with-react-redux');
      if (serializedState === null) {
          return undefined;
      }
      return JSON.parse(serializedState);
  } catch (err) {
      return undefined;
  }
}

const saveState = (state: AppState) => {
  try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('simple-counter-with-react-redux', serializedState);
  } catch (err) {
      console.log(err);
  }
}

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk),
);
store.subscribe(() => saveState(store.getState()));
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
