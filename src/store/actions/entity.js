import { Platform } from 'react-native';
import { batch } from 'react-redux';
import axios from 'axios';
import {
  SET_IS_CREATING_ENTITY,
  SET_ENTITY_CREATE_ERROR,
  SET_ENTITY_CREATE_SUCCESS,
  ENTITIES_CREATE,
  SET_ENTITY_REFRESHING,
  ADD_RELATIONSHIP_ENTITY_IDS,
  GET_LABEL_BY_BARCODE_SUCCESS,
  CLEAR_SCANNED_LABEL,
} from '../../constants/actionTypes/Entity';
import { uiStartLoading, uiStopLoading } from './ui';
import deviceInfo from '../../constants/device';

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

export const addRelationshipEntityId = (entity, relationshipEntities) => ({
  type: ADD_RELATIONSHIP_ENTITY_IDS,
  payload: { entity, relationshipEntities },
});

export const getLabelByBarCodeSuccess = label => ({
  type: GET_LABEL_BY_BARCODE_SUCCESS,
  payload: { label },
});

export const clearScannedLabel = () => ({
  type: CLEAR_SCANNED_LABEL,
  payload: { label: null },
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
        {
          const metaDataRaw = JSON.parse(entityRaw.meta_data);
          const dimensions = JSON.parse(entityRaw.dimensions);
          const boundingBoxRaw = metaDataRaw.bounding_box;
          entity.labelId = entityRaw.label_id;
          const boundingBox = {
            topLeft: boundingBoxRaw.top_left,
            bottomRight: boundingBoxRaw.bottom_right,
            height: boundingBoxRaw.height,
            width: boundingBoxRaw.width,
          };
          entity.metaData = {
            deviceInfo: {
              brand: metaDataRaw.device_info.brand,
              manufacturer: metaDataRaw.device_info.manufacturer,
              modelName: metaDataRaw.device_info.model_name,
              deviceYearClass: metaDataRaw.device_info.device_year_class,
              osName: metaDataRaw.device_info.os_name,
              osVersion: metaDataRaw.device_info.os_version,
            },
            location: metaDataRaw.location,
            boundingBox,
            user: metaDataRaw.user,
          };
          entity.labelId = entityRaw.label_id;
          entity.dimensions = dimensions;
          entity.angle = entityRaw.angle;
          entity.createdAt = new Date(entityRaw.created_at);
        }
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

export const createEntity = (
  entityType,
  relationshipEntity,
  name,
  gtin,
  callBarcodeSuccess,
) => {
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
    if (gtin) {
      params.gtin = gtin;
    }
    try {
      const response = await axios.post(`/${entityType}/${name}`, params);
      const entityRaw = response.data;
      const entities = buildEntities(entityType, [entityRaw]);
      batch(() => {
        if (callBarcodeSuccess) {
          dispatch(getLabelByBarCodeSuccess(entities[0]));
        }
        dispatch(entitiesCreate(entityType, entities));
        dispatch(setEntityCreateSuccess(entityType, true));
        if (relationshipEntity) {
          // Add the created entity id to its relation entity array of ids
          dispatch(addRelationshipEntityId(relationshipEntity, entities));
        }
      });
    } catch (error) {
      console.log('createEntity -> error', error);
      if (error.response) {
        const { data } = error.response;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('createEntity -> data', data);
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
      batch(() => {
        dispatch(entitiesCreate(entityType, entities));
        if (relationshipEntity) {
          // Add the created entity id to its relation entity array of ids
          dispatch(addRelationshipEntityId(relationshipEntity, entities));
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

export const uploadImage = (photo, label, boundingBox) => {
  return async (dispatch, getState) => {
    try {
      // const directoriesArray = photo.uri.split('/');
      // const fileName = directoriesArray[directoriesArray.length - 1];
      const { user } = getState();
      const bodyFormData = new FormData();
      const { bottomRight, topLeft, height, width } = boundingBox;
      const boundingBoxSnakeCase = {
        top_left: topLeft,
        bottom_right: bottomRight,
        height,
        width,
      };
      const {
        brand,
        manufacturer,
        modelName,
        deviceYearClass,
        osName,
        osVersion,
      } = deviceInfo;
      const metaDataSnakeCase = {
        device_info: {
          brand,
          manufacturer,
          model_name: modelName,
          device_year_class: deviceYearClass,
          os_name: osName,
          os_version: osVersion,
        },
        bounding_box: boundingBoxSnakeCase,
        location: photo.location,
        user: { id: user.id, email: user.email },
      };
      const imageDimensions = { height: photo.height, width: photo.width };
      bodyFormData.append('label_id', label.id);
      bodyFormData.append('dimensions', JSON.stringify(imageDimensions));
      bodyFormData.append('angle', JSON.stringify(photo.angle));
      bodyFormData.append('meta_data', JSON.stringify(metaDataSnakeCase));
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
      let response;
      const label = {};
      response = await axios.get(`/label/test`, {
        params: { gtin: barCode, dataset_id: relationshipEntity.id },
      });
      console.log('barCodeScanned -> server-response.data', response.data);
      if (response.data.error) {
        response = await axios.get(
          `https://eatfit-service.foodcoa.ch/products/${barCode}/`,
          {
            headers: {
              Authorization:
                'Basic ZWF0Zml0X3N0dWRlbnRfbWFyaW9zOjdGM1oxMDNMNzNrR3pkcDJtZmRjRDNVdw==',
            },
          },
        );
        console.log('barCodeScanned -> eatfit-response', response.data);
        if (response.data.success) {
          const [product] = response.data.products;
          label.name =
            product.product_name_en ||
            product.product_name_de ||
            product.product_name_fr ||
            product.product_name_it;
          if (product.image) {
            label.refImageUrl = product.image;
          }
        } else {
          const openFoodFactsUrl = `https://world.openfoodfacts.org/api/v0/product/${barCode}.json`;

          response = await axios.get(openFoodFactsUrl);
          console.log(
            'barCodeScanned -> openFoodFactsUrl-response',
            response.data,
          );
          const brand = response.data.product.brands;
          const productName = response.data.product.product_name;
          label.name = `${brand} ${productName}`;
        }
      } else {
        label.id = response.data.label.id;
        label.name = response.data.label.name;
      }
      console.log('barCodeScanned -> name', label);

      batch(() => {
        if (response.data.products || response.data.product) {
          const callBarcodeSuccess = true;
          dispatch(
            createEntity(
              'label',
              relationshipEntity,
              label.name,
              barCode,
              callBarcodeSuccess,
            ),
          );
        } else {
          dispatch(getLabelByBarCodeSuccess(label));
        }
        dispatch(uiStopLoading());
      });
    } catch (error) {
      console.log('barCodeScanned -> error', error);
      if (error.response) {
        const { data } = error.response;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('barCodeScanned -> data', data);
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
