import { combineReducers } from 'redux';

const initState = {};
const rootReducer = combineReducers({ dummy: (state = initState) => state });

export default rootReducer;
