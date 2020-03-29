import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { BlurView } from 'expo-blur';
import styles from './CameraScreenStyles';
import SvgBoundingBox from '../../components/SvgBoundingBox/SvgBoundingBox';
import { Platform } from 'react-native';

function CameraScreen() {
  let cameraRef;
  const [hasPermission, setHasPermission] = useState(null);
  async function getCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }
  useEffect(() => {
    getCameraPermission();
  }, []);

  const [cameraRatio, setCameraRatio] = useState('16:9');
  const [type] = useState(Camera.Constants.Type.back);

  // const getPictureSizes = async () => {
  //   const pictureSizes = await cameraRef.getAvailablePictureSizesAsync(
  //     cameraRatio,
  //   );
  //   console.log('getCameraTypes -> pictureSizes', pictureSizes);
  // };

  const getSupportedRatios = async () => {
    if (Platform.OS === 'android') {
      console.log('CameraScreen -> getSupportedRatios');
      if (cameraRef) {
        const supportedRatios = await cameraRef.getSupportedRatiosAsync();
        console.log(
          'CameraScreen -> getSupportedRatios -> supportedRatios',
          supportedRatios,
        );
        let camRatio;
        if (supportedRatios.includes('2:1')) {
          camRatio = '136:135';
        } else if (supportedRatios.includes('16:9')) {
          camRatio = '16:9';
        } else if (supportedRatios.includes('4:3')) {
          camRatio = '4:3';
        }
        if (camRatio) {
          setCameraRatio(camRatio);
        }
      }
      // getPictureSizes();
    }
  };

  console.log('CameraScreen -> render -> type', type);
  console.log('CameraScreen -> render -> cameraRatio', cameraRatio);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <SvgBoundingBox />
      <Camera
        ratio={cameraRatio}
        ref={ref => {
          cameraRef = ref;
        }}
        style={styles.camera}
        type={type}
        onCameraReady={getSupportedRatios}
      />
      {/* <View style={styles.textContainer}>
        <Text>Camera screen</Text> */}
      {/* 
          <Button
            icon={<Entypo name="camera" size={32} />}
            raised
            type="outline"
          /> */}
      {/* </View>
      <BlurView tint="dark" intensity={100} style={styles.notBlurred} /> */}
    </View>
  );
}

export default CameraScreen;
