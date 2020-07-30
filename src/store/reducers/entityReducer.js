import produce from 'immer';
import {
  SET_IS_CREATING_ENTITY,
  SET_ENTITY_CREATE_ERROR,
  SET_ENTITY_CREATE_SUCCESS,
  ENTITIES_CREATE,
  SET_IS_DELETING_ENTITY,
  SET_ENTITY_DELETE_ERROR,
  SET_ENTITY_DELETE_SUCCESS,
  ENTITIES_DELETE,
  SET_ENTITY_REFRESHING,
  ADD_RELATIONSHIP_ENTITY_IDS,
  GET_LABEL_BY_BARCODE_SUCCESS,
  CLEAR_SCANNED_LABEL,
} from '../../constants/actionTypes/Entity';

const baseEntityState = {
  byId: {},
  isBeingCreated: false,
  createError: null,
  createSuccess: false,
  isBeingDeleted: false,
  deleteError: null,
  deleteSuccess: false,
  refreshing: false,
};

const initialState = {
  dataset: baseEntityState,
  label: baseEntityState,
  image: baseEntityState,
  scannedLabel: null,
};

const setIsEntityCreated = produce((draft, { entityType, isBeingCreated }) => {
  draft[entityType].isBeingCreated = isBeingCreated;
});

const setEntityCreateError = produce((draft, { entityType, error }) => {
  draft[entityType].createError = error;
});

const setEntityCreateSuccess = produce(
  (draft, { entityType, createSuccess }) => {
    draft[entityType].createSuccess = createSuccess;
  },
);

const entitiesCreate = produce((draft, { entityType, entities }) => {
  entities.forEach(entity => {
    draft[entityType].byId[entity.id] = entity;
  });
});

const setIsEntityDeleted = produce((draft, { entityType, isBeingDeleted }) => {
  draft[entityType].isBeingDeleted = isBeingDeleted;
});

const setEntityDeleteError = produce((draft, { entityType, error }) => {
  draft[entityType].createError = error;
});

const setEntityDeleteSuccess = produce(
  (draft, { entityType, createSuccess }) => {
    draft[entityType].createSuccess = createSuccess;
  },
);

const entitiesDelete = produce((draft, { entityType, entities }) => {
  entities.forEach(entity => {
    delete draft[entityType].byId[entity.id];
  });
});

const setEntityRefreshing = produce((draft, { entityType, refreshing }) => {
  draft[entityType].refreshing = refreshing;
});

const addRelationshipEntityId = produce(
  (draft, { entity, relationshipEntities }) => {
    relationshipEntities.forEach(relationshipEntity => {
      const { type, id } = relationshipEntity;
      if (!draft[entity.type].byId[entity.id][`${type}Ids`].includes(id)) {
        draft[entity.type].byId[entity.id][`${type}Ids`].push(id);
      }
    });
  },
);

const setScannedLabel = produce((draft, { label }) => {
  draft.scannedLabel = label;
});

function entityReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_IS_CREATING_ENTITY:
      return setIsEntityCreated(state, payload);
    case SET_ENTITY_CREATE_ERROR:
      return setEntityCreateError(state, payload);
    case SET_ENTITY_CREATE_SUCCESS:
      return setEntityCreateSuccess(state, payload);
    case ENTITIES_CREATE:
      return entitiesCreate(state, payload);
    case SET_IS_DELETING_ENTITY:
      return setIsEntityDeleted(state, payload);
    case SET_ENTITY_DELETE_ERROR:
      return setEntityDeleteError(state, payload);
    case SET_ENTITY_DELETE_SUCCESS:
      return setEntityDeleteSuccess(state, payload);
    case ENTITIES_DELETE:
      return entitiesDelete(state, payload);
    case SET_ENTITY_REFRESHING:
      return setEntityRefreshing(state, payload);
    case ADD_RELATIONSHIP_ENTITY_IDS:
      return addRelationshipEntityId(state, payload);
    case GET_LABEL_BY_BARCODE_SUCCESS:
      return setScannedLabel(state, payload);
    case CLEAR_SCANNED_LABEL:
      return setScannedLabel(state, payload);
    default:
      return state;
  }
}

export default entityReducer;
