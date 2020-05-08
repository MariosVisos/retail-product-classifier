import produce from 'immer';
import {
  SET_USER_DATA,
  SET_IS_USER_SIGNING_IN,
  SET_IS_USER_SIGNING_UP,
  SET_SIGN_UP_ERROR,
  SET_SIGN_IN_ERROR,
} from '../../constants/UserActionTypes';

const initialState = {
  id: null,
  email: null,
  tokens: { accessToken: null, refreshToken: null },
  isSigningIn: false,
  isSigningUp: false,
  signUpError: null,
  signInError: null,
};

const setUserData = produce((draft, { tokens, user }) => {
  const { username, id } = user;
  const { accessToken, refreshToken } = tokens;
  draft.tokens.accessToken = accessToken;
  draft.tokens.refreshToken = refreshToken;
  draft.email = username;
  draft.id = id;
});

const setIsUserSigningIn = produce((draft, { isSigningIn }) => {
  draft.isSigningIn = isSigningIn;
});
const setIsUserSigningUp = produce((draft, { isSigningUp }) => {
  draft.isSigningUp = isSigningUp;
});

const setSignUpError = produce((draft, { error }) => {
  draft.signUpError = error;
});
const setSignInError = produce((draft, { error }) => {
  draft.signInError = error;
});

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA:
      return setUserData(state, payload);
    case SET_IS_USER_SIGNING_IN:
      return setIsUserSigningIn(state, payload);
    case SET_IS_USER_SIGNING_UP:
      return setIsUserSigningUp(state, payload);
    case SET_SIGN_UP_ERROR:
      return setSignUpError(state, payload);
    case SET_SIGN_IN_ERROR:
      return setSignInError(state, payload);
    default:
      return state;
  }
}

export default userReducer;
