import { combineReducers } from 'redux';
import userReducer from './userReducer';
import uiReducer from './uiReducer';
import entityReducer from './entityReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  entity: entityReducer,
  ui: uiReducer,
  user: userReducer,
  settings: settingsReducer,
});

export default rootReducer;
