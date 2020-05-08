import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  SET_USER_DATA,
  SET_IS_USER_SIGNING_IN,
  SET_IS_USER_SIGNING_UP,
  SET_SIGN_UP_ERROR,
  SET_SIGN_IN_ERROR,
} from '../../constants/UserActionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const setUserData = payload => ({
  type: SET_USER_DATA,
  payload,
});

export const setIsUserSigningIn = isSigningIn => ({
  type: SET_IS_USER_SIGNING_IN,
  payload: { isSigningIn },
});

export const setIsUserSigningUp = isSigningUp => ({
  type: SET_IS_USER_SIGNING_UP,
  payload: { isSigningUp },
});

export const setSignUpError = error => ({
  type: SET_SIGN_UP_ERROR,
  payload: { error },
});

export const setSignInError = error => ({
  type: SET_SIGN_IN_ERROR,
  payload: { error },
});

export const signIn = ({ email, password }) => {
  return async dispatch => {
    dispatch(setIsUserSigningIn(true));
    dispatch(uiStartLoading('Signing in...'));
    try {
      const response = await axios.post('/login', {
        username: email,
        password,
      });
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      const { user } = response.data;
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const userData = { tokens: { accessToken, refreshToken }, user };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      dispatch(setUserData(user));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        const errorData = {};
        if (data.reason === 'user_already_exists') {
          errorData.reason = 'userAlreadyExists';
          errorData.message = data.message;
        }
        dispatch(setSignInError(errorData));
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
    dispatch(setIsUserSigningIn(false));
    dispatch(uiStopLoading());
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
      console.log('signUp -> response.data', response.data);
      dispatch(signIn({ email, password }));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        const errorData = {};
        if (data.reason === 'invalid_credentials') {
          errorData.reason = 'invalidCredentials';
          errorData.message = data.message;
        }
        dispatch(setSignInError(errorData));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
      }
      dispatch(uiStopLoading());
      // console.log(error.config);
    }
    dispatch(setIsUserSigningUp(false));
  };
};
