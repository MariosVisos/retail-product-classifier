import axios from 'axios';
import {
  SET_IS_CREATING_DATASET,
  SET_DATASET_CREATE_ERROR,
  SET_DATASET_CREATE_SUCCESS,
  DATASETS_CREATE,
} from '../../constants/actionTypes/Entity';
import { uiStartLoading, uiStopLoading } from './ui';

export const setIsCreatingDataset = isCreatingDataset => ({
  type: SET_IS_CREATING_DATASET,
  payload: { isCreatingDataset },
});

export const setDatasetCreateError = error => ({
  type: SET_DATASET_CREATE_ERROR,
  payload: { error },
});

export const setDatasetCreateSuccess = createSuccess => ({
  type: SET_DATASET_CREATE_SUCCESS,
  payload: { createSuccess },
});

export const datasetsCreate = datasets => ({
  type: DATASETS_CREATE,
  payload: { datasets },
});

export const createDataset = ({ name }) => {
  return async dispatch => {
    dispatch(setIsCreatingDataset(true));
    dispatch(uiStartLoading('Creating shelve'));
    try {
      const response = await axios.post(`/dataset/${name}`);
      const dataset = response.data;
      console.log('createDataset -> dataset', dataset);
      dispatch(datasetsCreate([dataset]));
      dispatch(setDatasetCreateSuccess(true));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        const errorData = {};
        if (data.reason === 'name_already_exists') {
          errorData.reason = 'nameAlreadyExists';
          errorData.message = data.message;
        }
        if (data.reason === 'error_inserting') {
          errorData.reason = 'errorInserting';
          errorData.message = data.message;
        }
        dispatch(setDatasetCreateError(errorData));
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
    dispatch(setIsCreatingDataset(false));
    dispatch(uiStopLoading());
  };
};
