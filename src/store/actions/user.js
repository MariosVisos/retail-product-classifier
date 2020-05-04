import axios from 'axios';
import {
  SET_USER_TOKENS,
  SET_IS_USER_SIGNING_IN,
  SET_IS_USER_SIGNING_UP,
} from '../../constants/UserActionTypes';

export const setUserTokens = tokens => ({
  type: SET_USER_TOKENS,
  payload: tokens,
});

export const setIsUserSigningIn = isSigningIn => ({
  type: SET_IS_USER_SIGNING_IN,
  payload: isSigningIn,
});
export const setIsUserSigningUp = isSigningUp => ({
  type: SET_IS_USER_SIGNING_UP,
  payload: isSigningUp,
});

export const signIn = () => {
  return async dispatch => {
    dispatch(setIsUserSigningIn());
  };
};
export const signUp = ({ email, password }) => {
  console.log('signUp -> signUp', signUp);
  return async dispatch => {
    dispatch(setIsUserSigningUp(true));
    try {
      const response = await axios.post('/register', {
        username: email,
        password,
      });
      console.log('registerUser -> response', response);
    } catch (error) {
      console.log('registerUser -> error', error);
    }
    dispatch(setIsUserSigningUp(false));
  };
};
