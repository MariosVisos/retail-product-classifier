import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { useSafeArea } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import styles from './CameraScreenStyles';
// import SvgBoundingBox from '../../components/SvgBoundingBox/SvgBoundingBox';\
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

  const insets = useSafeArea();
  const marginTop = insets.top;

  const [cameraRatio, setCameraRatio] = useState('16:9');
  const [type] = useState(Camera.Constants.Type.back);

  // const getPictureSizes = async () => {
  //   const pictureSizes = await cameraRef.getAvailablePictureSizesAsync(
  //     cameraRatio,
  //   );
  // };

  const getSupportedRatios = async () => {
    try {
      if (Platform.OS === 'android') {
        if (cameraRef) {
          const supportedRatios = await cameraRef.getSupportedRatiosAsync();
          let camRatio;
          if (supportedRatios.includes('2:1')) {
            camRatio = '2:1';
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
    } catch (error) {
      console.log('getSupportedRatios -> error', error);
    }
  };

  async function snap() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log('snap -> photo', photo);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ ...styles.container, marginTop }}>
      {/* <SvgBoundingBox /> */}
      <Camera
        ratio={cameraRatio}
        ref={ref => {
          cameraRef = ref;
        }}
        style={styles.camera}
        type={type}
        onCameraReady={getSupportedRatios}
        useCamera2Api
      >
        <BoundingBox initialBoxWidth={100} initialBoxHeight={100} />
      </Camera>
      {/* <View style={styles.textContainer}>
        <Text>Camera screen</Text> */}

      <Button
        onPress={snap}
        icon={<Entypo name="camera" size={32} />}
        raised
        type="outline"
      />
      {/* </View>
      <BlurView tint="dark" intensity={100} style={styles.notBlurred} /> */}
    </View>
  );
}

export default CameraScreen;
