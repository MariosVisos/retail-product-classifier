import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  return store;
}

export default configureStore;
