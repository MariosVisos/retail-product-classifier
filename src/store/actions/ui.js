import {
  UI_START_LOADING,
  UI_STOP_LOADING,
} from '../../constants/UiActionTypes';

export const uiStartLoading = loadingText => {
  return {
    type: UI_START_LOADING,
    payload: { loadingText },
  };
};

export const uiStopLoading = () => {
  return {
    type: UI_STOP_LOADING,
  };
};
