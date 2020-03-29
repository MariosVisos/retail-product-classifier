import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import styles from './CameraScreenStyles';
import SvgBoundingBox from '../../components/SvgBoundingBox/SvgBoundingBox';
import BoundingBox from '../../components/BoundingBox/BoundingBox';

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
  // };

  const getSupportedRatios = async () => {
    if (Platform.OS === 'android') {
      if (cameraRef) {
        const supportedRatios = await cameraRef.getSupportedRatiosAsync();
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <SvgBoundingBox /> */}
      <Camera
        ratio={cameraRatio}
        ref={ref => {
          cameraRef = ref;
        }}
        style={styles.camera}
        type={type}
        onCameraReady={getSupportedRatios}
      >
        <BoundingBox />
      </Camera>
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
