import React from 'react';
import Overlay from '../Overlay/Overlay';
import Input from '../Input/Input';
import styles from './DatasetCreateOverlayStyles';

const DatasetCreateOverlay = ({ isVisible, toggleOverlay }) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      headerTitle="Create shelve"
      applyButtonTitle="Create shelve"
      overlayStyle={styles.container}
    >
      <Input
        containerStyle={styles.inputContainer}
        placeholder="e.g. Cereal"
        label="Shelve name"
      />
    </Overlay>
  );
};

export default DatasetCreateOverlay;
