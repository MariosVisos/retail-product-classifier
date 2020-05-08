import React from 'react';
import Overlay from '../Overlay/Overlay';
import Input from '../Input/Input';

const DatasetCreateOverlay = ({ isVisible, toggleOverlay }) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      headerTitle="Create shelve"
      applyButtonTitle="Create shelve"
    >
      <Input placeholder="e.g. Cereal" label="Shelve name" />
    </Overlay>
  );
};

export default DatasetCreateOverlay;
