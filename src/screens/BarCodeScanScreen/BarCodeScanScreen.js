import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
// import { useSafeArea } from 'react-native-safe-area-context';
// import { Button } from 'react-native-elements';
// import { Entypo } from '@expo/vector-icons';
// import * as Permissions from 'expo-permissions';
// import * as FileSystem from 'expo-file-system';
import styles from './BarCodeScanScreenStyles';
import SvgBoundingBox from '../../components/SvgBoundingBox/SvgBoundingBox';
// import { BarCodeScanner } from 'expo-barcode-scanner';

function BarCodeScanScreen({ navigation }) {
  let cameraRef;
  const [hasPermission, setHasPermission] = useState(null);
  async function getCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    // await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setHasPermission(status === 'granted');
  }
  useEffect(() => {
    getCameraPermission();
  }, []);

  const [cameraRatio, setCameraRatio] = useState('4:3');
  const [type] = useState(Camera.Constants.Type.back);

  // const getSupportedRatios = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       if (cameraRef) {
  //         const supportedRatios = await cameraRef.getSupportedRatiosAsync();
  //         console.log('getSupportedRatios -> supportedRatios', supportedRatios);
  //         let camRatio;
  //         if (supportedRatios.includes('2:1')) {
  //           camRatio = '2:1';
  //         } else if (supportedRatios.includes('16:9')) {
  //           camRatio = '16:9';
  //         } else if (supportedRatios.includes('4:3')) {
  //           camRatio = '4:3';
  //         }
  //         if (camRatio) {
  //           setCameraRatio(camRatio);
  //         }
  //       }
  //       // getPictureSizes();
  //     }
  //   } catch (error) {
  //     console.log('getSupportedRatios -> error', error);
  //   }
  // };

  async function snap() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log('snap -> photo', photo);
    }
  }

  function handleBarCodeScanned(e) {
    console.log('handleBarCodeScanned -> e', e);
    navigation.navigate('Camera');
  }

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
        onBarCodeScanned={handleBarCodeScanned}
        // onCameraReady={getSupportedRatios}
        // barCodeScannerSettings={{
        //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        // }}
        // useCamera2Api
      />
    </View>
  );
}

export default BarCodeScanScreen;
