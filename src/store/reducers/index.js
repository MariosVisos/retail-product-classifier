import { combineReducers } from 'redux';
import userReducer from './userReducer';
import uiReducer from './uiReducer';
import entityReducer from './entityReducer';

const rootReducer = combineReducers({
  entity: entityReducer,
  ui: uiReducer,
  user: userReducer,
});

export default rootReducer;
