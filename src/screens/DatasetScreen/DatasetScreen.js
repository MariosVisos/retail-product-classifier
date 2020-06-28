import React, { useState } from 'react';
import { View } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import LabelList from '../../components/LabelList/LabelList';

import styles from './DatasetScreenStyles';
import Button from '../../components/ui/Button/Button';
import Colors from '../../constants/Colors';
import EntityCreateOverlay from '../../components/EntityCreateOverlay/EntityCreateOverlay';

const DatasetScreen = ({ navigation, route }) => {
  const { id } = route.params.dataset;
  const [isCreateLabelVisible, setIsCreateLabelVisible] = useState(false);
  const toggleCreateLabelOverlay = () => {
    setIsCreateLabelVisible(
      prevIsCreateLabelVisible => !prevIsCreateLabelVisible,
    );
  };
  const { container, trainButton, scanToAddButton, manuallyAddButton } = styles;
  const relationshipEntity = { type: 'dataset', id };

  return (
    <View style={container}>
      <LabelList
        navigation={navigation}
        relationshipEntity={relationshipEntity}
      />
      <Button title="Model train" containerStyle={trainButton} raised />
      <Button
        icon={<FontAwesome5 name="barcode" size={26} color={Colors.primary} />}
        title="Scan to add"
        containerStyle={scanToAddButton}
        raised
      />
      <Button
        onPress={toggleCreateLabelOverlay}
        icon={<AntDesign name="pluscircleo" size={26} color={Colors.primary} />}
        title="Manually add"
        containerStyle={manuallyAddButton}
        raised
      />
      <EntityCreateOverlay
        isVisible={isCreateLabelVisible}
        toggleOverlay={toggleCreateLabelOverlay}
        entityType="label"
        relationshipEntity={relationshipEntity}
      />
    </View>
  );
};

export default DatasetScreen;
