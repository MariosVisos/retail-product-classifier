import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Overlay from '../Overlay/Overlay';
import Input from '../Input/Input';
import Loading from '../Loading/Loading';
import styles from './DatasetCreateOverlayStyles';
import {
  createDataset,
  setDatasetCreateError,
  setDatasetCreateSuccess,
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

  const isCreatingDataset = useSelector(
    state => state.entity.dataset.isCreatingDataset,
  );

  const dispatch = useDispatch();

  function resetValidationError() {
    if (!isDatasetNameValid) {
      setIsDatasetNameValid(true);
    }
    if (createDatasetError) {
      dispatch(setDatasetCreateError(null));
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
      dispatch(setDatasetCreateSuccess(false));
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
      dispatch(createDataset({ name: datasetName }));
    }
  }

  if (isCreatingDataset) {
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
