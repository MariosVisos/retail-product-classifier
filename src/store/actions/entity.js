import axios from 'axios';
import {
  SET_IS_CREATING_ENTITY,
  SET_ENTITY_CREATE_ERROR,
  SET_ENTITY_CREATE_SUCCESS,
  ENTITIES_CREATE,
  SET_ENTITY_REFRESHING,
} from '../../constants/actionTypes/Entity';
import { uiStartLoading, uiStopLoading } from './ui';

export const setIsCreatingEntity = ({ entityType, isBeingCreated }) => ({
  type: SET_IS_CREATING_ENTITY,
  payload: { entityType, isBeingCreated },
});

export const setEntityCreateError = ({ entityType, error }) => ({
  type: SET_ENTITY_CREATE_ERROR,
  payload: { entityType, error },
});

export const setEntityCreateSuccess = ({ entityType, createSuccess }) => ({
  type: SET_ENTITY_CREATE_SUCCESS,
  payload: { entityType, createSuccess },
});

export const entitiesCreate = ({ entityType, entities }) => ({
  type: ENTITIES_CREATE,
  payload: { entityType, entities },
});

export const setEntityRefreshing = ({ entityType, refreshing }) => ({
  type: SET_ENTITY_REFRESHING,
  payload: { entityType, refreshing },
});

export const createEntity = ({ entityType, name }) => {
  return async dispatch => {
    dispatch(setIsCreatingEntity({ entityType, isBeingCreated: true }));
    dispatch(uiStartLoading('Creating shelf'));
    try {
      const response = await axios.post(`/${entityType}/${name}`);
      const entity = response.data;
      dispatch(entitiesCreate({ entityType, entities: [entity] }));
      dispatch(setEntityCreateSuccess({ entityType, createSuccess: true }));
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
        dispatch(setEntityCreateError({ entityType, error: errorData }));
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
    dispatch(setIsCreatingEntity({ entityType, isBeingCreated: false }));
    dispatch(uiStopLoading());
  };
};

export const entityRefresh = ({ entityType }) => {
  return async dispatch => {
    dispatch(setEntityRefreshing({ entityType, refreshing: true }));
    try {
      const entityPlural = `${entityType}s`;
      const response = await axios.get(`/${entityPlural}`);
      const entities = response.data[entityPlural];
      dispatch(entitiesCreate({ entityType, entities }));
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
    dispatch(setEntityRefreshing({ entityType, refreshing: false }));
  };
};
