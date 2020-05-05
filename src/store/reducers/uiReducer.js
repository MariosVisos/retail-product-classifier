import {
  UI_START_LOADING,
  UI_STOP_LOADING,
} from '../../constants/UiActionTypes';

const initialState = {
  isLoading: false,
  loadingText: '',
};

const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UI_START_LOADING:
      return { ...state, isLoading: true, loadingText: payload.loadingText };
    case UI_STOP_LOADING:
      return { ...state, isLoading: false, loadingText: '' };
    default:
      return state;
  }
};

export default uiReducer;
