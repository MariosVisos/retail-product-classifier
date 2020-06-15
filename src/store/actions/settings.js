import { TOGGLE_DONT_SHOW_AGAIN } from '../../constants/actionTypes/Settings';

export const toggleDontShowAgain = step => ({
  type: TOGGLE_DONT_SHOW_AGAIN,
  payload: { step },
});
