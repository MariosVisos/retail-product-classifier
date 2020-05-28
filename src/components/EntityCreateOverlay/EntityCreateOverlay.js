import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Overlay from '../ui/Overlay/Overlay';
import Input from '../ui/Input/Input';
import Loading from '../Loading/Loading';
import styles from './EntityCreateOverlayStyles';
import {
  createEntity,
  setEntityCreateError,
  setEntityCreateSuccess,
} from '../../store/actions/entity';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

const EntityCreateOverlay = ({
  isVisible,
  toggleOverlay,
  entityType,
  relationshipEntity,
}) => {
  const entityDisplayName = entityType === 'dataset' ? 'shelf' : entityType;
  const entityDisplayNameCapitalized =
    entityType === 'dataset' ? 'Shelf' : capitalizeFirstLetter(entityType);
  const exampleInputValue =
    entityType === 'dataset' ? 'Cereal' : 'Kellogs Special K';
  const [entityName, setEntityName] = useState('');
  const [isEntityNameValid, setIsEntityNameValid] = useState(true);

  const createEntityError = useSelector(
    state => state.entity[entityType].createError,
  );

  const createEntitySuccess = useSelector(
    state => state.entity[entityType].createSuccess,
  );

  const isBeingCreated = useSelector(
    state => state.entity[entityType].isBeingCreated,
  );

  const dispatch = useDispatch();

  function resetValidationError() {
    if (!isEntityNameValid) {
      setIsEntityNameValid(true);
    }
    if (createEntityError) {
      dispatch(setEntityCreateError({ entityType, error: null }));
    }
  }

  function handleBackdropPress() {
    if (isVisible) {
      setEntityName('');
    }
    resetValidationError();
    toggleOverlay();
  }

  useEffect(() => {
    if (createEntitySuccess) {
      setEntityName('');
      handleBackdropPress();
      dispatch(setEntityCreateSuccess(entityType, false));
    }
  }, [dispatch, createEntitySuccess]);

  function handleEntityNameChange(text) {
    resetValidationError();
    setEntityName(text);
  }

  function getEntityNameErrorMessage() {
    if (!isEntityNameValid) {
      return `${entityDisplayNameCapitalized} name cannot be empty!`;
    }
    if (createEntityError) {
      return createEntityError.message;
    }
    return '';
  }

  function handleCreateEntityPress() {
    const emptyEntityName = entityName.length === 0;
    if (emptyEntityName) {
      setIsEntityNameValid(false);
    } else {
      dispatch(createEntity(entityType, entityName, relationshipEntity));
    }
  }

  if (isBeingCreated) {
    return <Loading />;
  }

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={handleBackdropPress}
      headerTitle={`Create new ${entityDisplayName}`}
      applyButtonTitle={`Create ${entityDisplayName}`}
      overlayStyle={styles.container}
      onApplyPress={handleCreateEntityPress}
    >
      <Input
        containerStyle={styles.inputContainer}
        placeholder={`e.g. ${exampleInputValue}`}
        label={`${entityDisplayNameCapitalized} name`}
        value={entityName}
        onChangeText={handleEntityNameChange}
        errorMessage={getEntityNameErrorMessage()}
        onSubmitEditing={handleCreateEntityPress}
      />
    </Overlay>
  );
};

export default EntityCreateOverlay;
