import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import styles from './CameraScreenStyles';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Camera screen</Text>
      <Button icon={<Entypo name="camera" size={32} />} raised type="outline" />
    </View>
  );
};

export default CameraScreen;
