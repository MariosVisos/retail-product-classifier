import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Overlay from '../Overlay/Overlay';
import Input from '../Input/Input';
import Loading from '../Loading/Loading';
import styles from './DatasetCreateOverlayStyles';
import {
  createEntity,
  setEntityCreateError,
  setEntityCreateSuccess,
} from '../../store/actions/entity';

const DatasetCreateOverlay = ({ isVisible, toggleOverlay }) => {
  const [datasetName, setDatasetName] = useState('');
  const [isDatasetNameValid, setIsDatasetNameValid] = useState(true);

  const createDatasetError = useSelector(
    state => state.entity.dataset.createError,
  );

  const createDatasetSuccess = useSelector(
    state => state.entity.dataset.createSuccess,
  );

  const isBeingCreated = useSelector(
    state => state.entity.dataset.isBeingCreated,
  );

  const dispatch = useDispatch();

  function resetValidationError() {
    if (!isDatasetNameValid) {
      setIsDatasetNameValid(true);
    }
    if (createDatasetError) {
      dispatch(setEntityCreateError({ entityType: 'dataset', error: null }));
    }
  }

  function handleBackdropPress() {
    if (isVisible) {
      setDatasetName('');
    }
    resetValidationError();
    toggleOverlay();
  }

  useEffect(() => {
    if (createDatasetSuccess) {
      setDatasetName('');
      handleBackdropPress();
      dispatch(
        setEntityCreateSuccess({ entityType: 'dataset', createSuccess: false }),
      );
    }
  }, [dispatch, createDatasetSuccess]);

  function handleDatasetNameChange(text) {
    resetValidationError();
    setDatasetName(text);
  }

  function getDatasetNameErrorMessage() {
    if (!isDatasetNameValid) {
      return 'Shelve name cannot be empty!';
    }
    if (createDatasetError) {
      return createDatasetError.message;
    }
    return '';
  }

  function handleCreateDatasetPress() {
    const emptyDatasetName = datasetName.length === 0;
    if (emptyDatasetName) {
      setIsDatasetNameValid(false);
    } else {
      dispatch(createEntity({ entityType: 'dataset', name: datasetName }));
    }
  }

  if (isBeingCreated) {
    return <Loading />;
  }

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={handleBackdropPress}
      headerTitle="Create new shelve"
      applyButtonTitle="Create shelve"
      overlayStyle={styles.container}
      onApplyPress={handleCreateDatasetPress}
    >
      <Input
        containerStyle={styles.inputContainer}
        placeholder="e.g. Cereal"
        label="Shelve name"
        value={datasetName}
        onChangeText={handleDatasetNameChange}
        errorMessage={getDatasetNameErrorMessage()}
        onSubmitEditing={handleCreateDatasetPress}
      />
    </Overlay>
  );
};

export default DatasetCreateOverlay;
