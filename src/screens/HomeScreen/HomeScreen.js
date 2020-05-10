import React, { useState } from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './HomeScreenStyles';
import Colors from '../../constants/Colors';
import DatasetList from '../../components/DatasetList/DatasetList';
import Button from '../../components/Button/Button';
import DatasetCreateOverlay from '../../components/DatasetCreateOverlay/DatasetCreateOverlay';

const HomeScreen = ({ navigation }) => {
  const [isCreateDatasetVisible, setIsCreateDatasetVisible] = useState(false);
  const toggleCreateDatasetOverlay = () => {
    setIsCreateDatasetVisible(!isCreateDatasetVisible);
  };

  const { container, fab } = styles;
  return (
    <View style={container}>
      <DatasetList navigation={navigation} />
      <Button
        onPress={toggleCreateDatasetOverlay}
        icon={<AntDesign name="pluscircleo" size={26} color={Colors.primary} />}
        title="New Shelve"
        containerStyle={fab}
        raised
      />
      <DatasetCreateOverlay
        isVisible={isCreateDatasetVisible}
        toggleOverlay={toggleCreateDatasetOverlay}
      />
    </View>
  );
};

export default HomeScreen;
