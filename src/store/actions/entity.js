import axios from 'axios';
import {
  SET_IS_CREATING_DATASET,
  SET_DATASET_CREATE_ERROR,
  SET_DATASET_CREATE_SUCCESS,
  DATASETS_CREATE,
  SET_DATASETS_REFRESHING,
} from '../../constants/actionTypes/Entity';
import { uiStartLoading, uiStopLoading } from './ui';

export const setIsCreatingDataset = isBeingCreated => ({
  type: SET_IS_CREATING_DATASET,
  payload: { isBeingCreated },
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

export const setDatasetsResfreshing = refreshing => ({
  type: SET_DATASETS_REFRESHING,
  payload: { refreshing },
});

export const createDataset = ({ name }) => {
  return async dispatch => {
    dispatch(setIsCreatingDataset(true));
    dispatch(uiStartLoading('Creating shelve'));
    try {
      const response = await axios.post(`/dataset/${name}`);
      const dataset = response.data;
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

export const datasetsRefresh = () => {
  return async dispatch => {
    dispatch(setDatasetsResfreshing(true));
    try {
      const response = await axios.get('/datasets');
      const { datasets } = response.data;
      dispatch(datasetsCreate(datasets));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
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
    dispatch(setDatasetsResfreshing(false));
  };
};
