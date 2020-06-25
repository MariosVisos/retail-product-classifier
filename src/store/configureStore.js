import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { baseUrl } from '../constants/api';

axios.defaults.baseURL = baseUrl;

function configureStore() {
  const store = createStore(
    rootReducer,
    // applyMiddleware(thunk),
    composeWithDevTools(applyMiddleware(thunk)),
  );
  return store;
}

export default configureStore;
