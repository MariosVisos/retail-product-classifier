import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

axios.defaults.baseURL = 'http://192.168.43.30:5000';

function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    // composeWithDevTools(applyMiddleware(thunk)),
  );
  return store;
}

export default configureStore;
