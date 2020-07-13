import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import styles from './HomeScreenStyles';
import Colors from '../../constants/Colors';
import DatasetList from '../../components/DatasetList/DatasetList';
import Button from '../../components/ui/Button/Button';
import EntityCreateOverlay from '../../components/EntityCreateOverlay/EntityCreateOverlay';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Ask for camera permission after component mounts for the first time
    // Immediately Invoked Function Expression
    (async function getCameraPermission() {
      await Camera.requestPermissionsAsync();
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Location.requestPermissionsAsync();
    })();
  }, []);

  const [isCreateDatasetVisible, setIsCreateDatasetVisible] = useState(false);
  const toggleCreateDatasetOverlay = () => {
    setIsCreateDatasetVisible(
      prevIsCreateDatasetVisible => !prevIsCreateDatasetVisible,
    );
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
