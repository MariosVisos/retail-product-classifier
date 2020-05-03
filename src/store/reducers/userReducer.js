import produce from 'immer';
import { SET_USER_TOKENS } from '../../constants/UserActionTypes';

const initialState = {
  tokens: { accessToken: null, refreshToken: null },
};

const setUserTokens = produce((draft, { tokens }) => {
  const { accessToken, refreshToken } = tokens;
  draft.tokens.accessToken = accessToken;
  draft.tokens.refreshToken = refreshToken;
});

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_TOKENS:
      return setUserTokens(state, payload);
    default:
      return state;
  }
}

export default userReducer;
