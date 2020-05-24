import { Platform } from 'react-native';
import { batch } from 'react-redux';
import axios from 'axios';
import {
  SET_IS_CREATING_ENTITY,
  SET_ENTITY_CREATE_ERROR,
  SET_ENTITY_CREATE_SUCCESS,
  ENTITIES_CREATE,
  SET_ENTITY_REFRESHING,
  ADD_RELATIONSHIP_ENTITY_ID,
  GET_LABEL_BY_BARCODE_SUCCESS,
  CLEAR_SCANNED_LABEL,
} from '../../constants/actionTypes/Entity';
import { uiStartLoading, uiStopLoading } from './ui';

export const setIsCreatingEntity = (entityType, isBeingCreated) => ({
  type: SET_IS_CREATING_ENTITY,
  payload: { entityType, isBeingCreated },
});

export const setEntityCreateError = (entityType, error) => ({
  type: SET_ENTITY_CREATE_ERROR,
  payload: { entityType, error },
});

export const setEntityCreateSuccess = (entityType, createSuccess) => ({
  type: SET_ENTITY_CREATE_SUCCESS,
  payload: { entityType, createSuccess },
});

export const entitiesCreate = (entityType, entities) => ({
  type: ENTITIES_CREATE,
  payload: { entityType, entities },
});

export const setEntityRefreshing = (entityType, refreshing) => ({
  type: SET_ENTITY_REFRESHING,
  payload: { entityType, refreshing },
});

export const addRelationshipEntityId = (entity, relationshipEntity) => ({
  type: ADD_RELATIONSHIP_ENTITY_ID,
  payload: { entity, relationshipEntity },
});

export const getLabelByBarCodeSuccess = labelName => ({
  type: GET_LABEL_BY_BARCODE_SUCCESS,
  payload: { labelName },
});

export const clearScannedLabel = () => ({
  type: CLEAR_SCANNED_LABEL,
  payload: { labelName: null },
});

function buildEntities(entityType, entitiesRaw) {
  const entities = [];
  entitiesRaw.forEach(entityRaw => {
    const entity = {};
    entity.name = entityRaw.name;
    entity.id = entityRaw.id;
    entity.type = entityType;
    switch (entityType) {
      case 'dataset':
        entity.labelIds = entityRaw.label_ids;
        break;
      case 'label':
        entity.imageIds = entityRaw.image_ids;
        break;
      case 'image':
        entity.labelId = entityRaw.label_id;
        break;
      default:
        console.error(
          'buildEntities -> default: unknown entity type:',
          entityType,
        );
    }

    entities.push(entity);
  });
  return entities;
}

export const createEntity = (entityType, name, relationshipEntity) => {
  return async dispatch => {
    batch(() => {
      dispatch(setIsCreatingEntity(entityType, true));
      dispatch(uiStartLoading('Creating shelf'));
    });
    const params = {};
    if (relationshipEntity) {
      const { type, id } = relationshipEntity;
      params[`${type}_id`] = id;
    }
    try {
      const response = await axios.post(`/${entityType}/${name}`, params);
      const entityRaw = response.data;
      const [entity] = buildEntities(entityType, [entityRaw]);
      batch(() => {
        dispatch(entitiesCreate(entityType, [entity]));
        dispatch(setEntityCreateSuccess(entityType, true));
        if (relationshipEntity) {
          // Add the created entity id to its relation entity array of ids
          dispatch(
            addRelationshipEntityId(relationshipEntity, {
              entity,
            }),
          );
        }
      });
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
        dispatch(setEntityCreateError(entityType, errorData));
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
    dispatch(setIsCreatingEntity(entityType, false));
    dispatch(uiStopLoading());
  };
};

export const entityRefresh = (entityType, relationshipEntity) => {
  return async dispatch => {
    dispatch(setEntityRefreshing(entityType, true));
    try {
      const entityPlural = `${entityType}s`;
      // let relationshipIdUrl = '';
      const params = {};
      if (relationshipEntity) {
        const { type, id } = relationshipEntity;
        // relationshipIdUrl = `/${id}`;
        params[`${type}_id`] = id;
      }
      const response = await axios.get(`/${entityPlural}`, { params });
      // const response = await axios.get(`/${entityPlural}${relationshipIdUrl}`);
      const entitiesRaw = response.data[entityPlural];
      const entities = buildEntities(entityType, entitiesRaw);
      dispatch(entitiesCreate(entityType, entities));
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
    dispatch(setEntityRefreshing(entityType, false));
  };
};

export const uploadImage = (photo, labelName) => {
  return async dispatch => {
    try {
      // const directoriesArray = photo.uri.split('/');
      // const fileName = directoriesArray[directoriesArray.length - 1];
      const bodyFormData = new FormData();
      bodyFormData.append('label_name', labelName);
      bodyFormData.append('image', {
        name: 'test.jpg',
        type: 'image/jpg',
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });

      await axios.post(`/upload/image`, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // const response = await axios({
      //   method: 'post',
      //   url: '/upload/image',
      //   data: bodyFormData,
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });
      // const entities = response.data[entityPlural];
      // dispatch(entitiesCreate('image', entities ));
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
  };
};

export const barCodeScanned = (barCode, relationshipEntity) => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading('Getting product'));
      const response = await axios.get(
        `https://eatfit-service.foodcoa.ch/products/${barCode}/`,
        {
          headers: {
            Authorization:
              'Basic ZWF0Zml0X3N0dWRlbnRfbWFyaW9zOjdGM1oxMDNMNzNrR3pkcDJtZmRjRDNVdw==',
          },
        },
      );
      const [product] = response.data.products;
      const name = product.product_name_en;
      batch(() => {
        dispatch(createEntity('label', name, relationshipEntity));
        dispatch(getLabelByBarCodeSuccess(name));
        dispatch(uiStopLoading());
      });
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
      dispatch(uiStopLoading());
    }
  };
};
