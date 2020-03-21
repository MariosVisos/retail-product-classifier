import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    // composeWithDevTools(applyMiddleware(thunk)),
  );
  return store;
}

export default configureStore;
