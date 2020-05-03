import { SET_USER_TOKENS } from '../../constants/UserActionTypes';
import { AsyncStorage } from 'react-native';

export const setUserTokens = tokens => ({
  type: SET_USER_TOKENS,
  payload: tokens,
});

export const loadUserTokens = () => {
  console.log('loadUserTokens -> loadUserTokens', loadUserTokens);
  return async dispatch => {
    const userTokens = await AsyncStorage.getItem('userTokens');
    console.log('loadUserTokens -> userTokens', userTokens);
  };
};
