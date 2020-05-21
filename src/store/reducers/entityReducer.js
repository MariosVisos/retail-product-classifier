import produce from 'immer';
import {
  SET_IS_CREATING_ENTITY,
  SET_ENTITY_CREATE_ERROR,
  SET_ENTITY_CREATE_SUCCESS,
  ENTITIES_CREATE,
  SET_ENTITY_REFRESHING,
  ADD_RELATIONSHIP_ENTITY_ID,
} from '../../constants/actionTypes/Entity';

function getBaseEntityState() {
  const baseEntityState = {
    byId: {},
    isBeingCreated: false,
    createError: null,
    createSuccess: false,
    refreshing: false,
  };
  return baseEntityState;
}
const baseEntityState = {
  byId: {},
  isBeingCreated: false,
  createError: null,
  createSuccess: false,
  refreshing: false,
};

const initialState = {
  dataset: baseEntityState,
  label: baseEntityState,
  image: baseEntityState,
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

const setEntityRefreshing = produce((draft, { entityType, refreshing }) => {
  draft[entityType].refreshing = refreshing;
});

const addRelationshipEntityId = produce((draft, yo) => {
  console.log('addRelationshipEntityId -> yo', yo);
  const { entityId, relationshipEntity, entityType } = yo;
  const { type, id } = relationshipEntity;
  draft[entityType].byId[entityId][`${type}Ids`].push(id);
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
    case SET_ENTITY_REFRESHING:
      return setEntityRefreshing(state, payload);
    case ADD_RELATIONSHIP_ENTITY_ID:
      return addRelationshipEntityId(state, payload);
    default:
      return state;
  }
}

export default entityReducer;
