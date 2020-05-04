import produce from 'immer';
import {
  SET_USER_TOKENS,
  SET_IS_USER_SIGNING_IN,
  SET_IS_USER_SIGNING_UP,
} from '../../constants/UserActionTypes';

const initialState = {
  tokens: { accessToken: null, refreshToken: null },
  isSigningIn: false,
  isSigningUp: false,
};

const setUserTokens = produce((draft, { tokens }) => {
  const { accessToken, refreshToken } = tokens;
  draft.tokens.accessToken = accessToken;
  draft.tokens.refreshToken = refreshToken;
});

const setIsUserSigningIn = produce((draft, { isSigningIn }) => {
  draft.isSigningIn = isSigningIn;
});
const setIsUserSigningUp = produce((draft, { isSigningUp }) => {
  draft.isSigningUp = isSigningUp;
});

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_TOKENS:
      return setUserTokens(state, payload);
    case SET_IS_USER_SIGNING_IN:
      return setIsUserSigningIn(state, payload);
    case SET_IS_USER_SIGNING_UP:
      return setIsUserSigningUp(state, payload);
    default:
      return state;
  }
}

export default userReducer;
