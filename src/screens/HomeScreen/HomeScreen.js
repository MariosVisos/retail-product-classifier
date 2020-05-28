import React, { useState } from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './HomeScreenStyles';
import Colors from '../../constants/Colors';
import DatasetList from '../../components/DatasetList/DatasetList';
import Button from '../../components/ui/Button/Button';
import EntityCreateOverlay from '../../components/EntityCreateOverlay/EntityCreateOverlay';

const HomeScreen = ({ navigation }) => {
  const [isCreateDatasetVisible, setIsCreateDatasetVisible] = useState(false);
  const toggleCreateDatasetOverlay = () => {
    setIsCreateDatasetVisible(!isCreateDatasetVisible);
  };

  const { container, newShelfButtonContainer } = styles;
  return (
    <View style={container}>
      <DatasetList navigation={navigation} />
      <Button
        onPress={toggleCreateDatasetOverlay}
        icon={<AntDesign name="pluscircleo" size={26} color={Colors.primary} />}
        title="New Shelf"
        containerStyle={newShelfButtonContainer}
        raised
      />
      <EntityCreateOverlay
        isVisible={isCreateDatasetVisible}
        toggleOverlay={toggleCreateDatasetOverlay}
        entityType="dataset"
      />
    </View>
  );
};

export default HomeScreen;
