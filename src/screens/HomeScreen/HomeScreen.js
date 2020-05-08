import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './HomeScreenStyles';
import Colors from '../../constants/Colors';
import Button from '../../components/Button/Button';
import Overlay from '../../components/Overlay/Overlay';

const HomeScreen = ({ navigation }) => {
  const [isCreateDatasetVisible, setIsCreateDatasetVisible] = useState(false);

  const { container, fab } = styles;
  const toggleCreateDatasetOverlay = () => {
    setIsCreateDatasetVisible(!isCreateDatasetVisible);
  };
  return (
    <View style={container}>
      <Text>hey there</Text>
      <Button
        // onPress={() => navigation.navigate('Camera')}
        onPress={toggleCreateDatasetOverlay}
        icon={<AntDesign name="pluscircleo" size={26} color={Colors.primary} />}
        title="New Shelve"
        containerStyle={fab}
        raised
      />
      <Overlay
        isVisible={isCreateDatasetVisible}
        onBackdropPress={toggleCreateDatasetOverlay}
        headerTitle="Create Shelve"
      >
        <Text>Create new selve</Text>
      </Overlay>
    </View>
  );
};

export default HomeScreen;
