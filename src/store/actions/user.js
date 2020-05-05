import axios from 'axios';
import {
  SET_USER_TOKENS,
  SET_IS_USER_SIGNING_IN,
  SET_IS_USER_SIGNING_UP,
} from '../../constants/UserActionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const setUserTokens = tokens => ({
  type: SET_USER_TOKENS,
  payload: tokens,
});

export const setIsUserSigningIn = isSigningIn => ({
  type: SET_IS_USER_SIGNING_IN,
  payload: { isSigningIn },
});
export const setIsUserSigningUp = isSigningUp => ({
  type: SET_IS_USER_SIGNING_UP,
  payload: { isSigningUp },
});

export const signIn = () => {
  return async dispatch => {
    dispatch(setIsUserSigningIn());
  };
};
export const signUp = ({ email, password }) => {
  return async dispatch => {
    dispatch(setIsUserSigningUp(true));
    dispatch(uiStartLoading('Signing up...'));
    try {
      const response = await axios.post('/register', {
        username: email,
        password,
      });
      console.log('signUp -> response', response);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
      }
      // console.log(error.config);
    }
    dispatch(setIsUserSigningUp(false));
    dispatch(uiStopLoading());
  };
};
