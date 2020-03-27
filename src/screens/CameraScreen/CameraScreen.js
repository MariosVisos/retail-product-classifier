import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import styles from './CameraScreenStyles';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const type = Camera.Constants.Type.back;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} />
      <View style={styles.textContainer}>
        <Text>Camera screen</Text>
        {/* 
          <Button
            icon={<Entypo name="camera" size={32} />}
            raised
            type="outline"
          /> */}
      </View>
    </View>
  );
};

export default CameraScreen;
