import produce from 'immer';
import { TOGGLE_DONT_SHOW_AGAIN } from '../../constants/actionTypes/Settings';

const initialState = {
  showTutorialByStep: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  },
};

const toggleDontShowAgain = produce((draft, { step }) => {
  draft.showTutorialByStep[step] = !draft.showTutorialByStep[step];
});

function settingsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_DONT_SHOW_AGAIN:
      return toggleDontShowAgain(state, payload);
    default:
      return state;
  }
}

export default settingsReducer;
