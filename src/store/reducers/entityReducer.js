import produce from 'immer';
import {
  SET_IS_CREATING_DATASET,
  SET_DATASET_CREATE_ERROR,
  SET_DATASET_CREATE_SUCCESS,
  DATASETS_CREATE,
} from '../../constants/actionTypes/Entity';

const initialState = {
  dataset: {
    byId: {},
    isCreatingDataset: false,
    createError: null,
    createSuccess: false,
  },
  label: { byId: {} },
  image: { byId: {} },
};

const setIsDatasetCreated = produce((draft, { isCreatingDataset }) => {
  draft.dataset.isCreatingDataset = isCreatingDataset;
});

const setDatasetCreateError = produce((draft, { error }) => {
  draft.dataset.createError = error;
});

const setDatasetCreateSuccess = produce((draft, { createSuccess }) => {
  draft.dataset.createSuccess = createSuccess;
});

const datasetsCreate = produce((draft, { datasets }) => {
  datasets.forEach(dataset => {
    draft.dataset.byId[dataset.id] = dataset;
  });
});

function entityReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_IS_CREATING_DATASET:
      return setIsDatasetCreated(state, payload);
    case SET_DATASET_CREATE_ERROR:
      return setDatasetCreateError(state, payload);
    case SET_DATASET_CREATE_SUCCESS:
      return setDatasetCreateSuccess(state, payload);
    case DATASETS_CREATE:
      return datasetsCreate(state, payload);
    default:
      return state;
  }
}

export default entityReducer;
