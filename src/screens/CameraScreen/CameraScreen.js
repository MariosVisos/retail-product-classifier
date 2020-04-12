import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { useSafeArea } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
// import * as FileSystem from 'expo-file-system';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SvgBoundingBox from '../../components/SvgBoundingBox/SvgBoundingBox';
import styles from './CameraScreenStyles';
import BoundingBox from '../../components/BoundingBox/BoundingBox';

function CameraScreen() {
  let cameraRef;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRatio, setCameraRatio] = useState('16:9');
  const [isBarCodeScanned, setIsBarCodeScanned] = useState(false);
  // const [showStepBackTutorial, setShowStepBackTutorial] = useState(true);

  useEffect(() => {
    // Ask for camera permission after component mounts for the first time
    // Immediately Invoked Function Expression
    (async function getCameraPermission() {
      const { status } = await Camera.requestPermissionsAsync();
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Get safe areas and notches
  const insets = useSafeArea();
  const marginTop = insets.top;

  const cameraType = Camera.Constants.Type.back;

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

  async function handleCameraButtonPress() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log('snap -> photo', photo);
      // const directoriesArray = photo.uri.split('/');
      // const fileName = directoriesArray[directoriesArray.length - 1];
      // const fileName = 'image.jpg';
      // const directory = `${FileSystem.documentDirectory}myImages/${fileName}`;
      // console.log('snap -> directory', directory);
      // FileSystem.copyAsync({ from: photo.uri, to: directory });
    }
  }

  function handleBarCodeScanned(e) {
    if (!isBarCodeScanned) {
      console.log('handleBarCodeScanned -> e', e);
      setIsBarCodeScanned(true);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // if (showStepBackTutorial) {
  //   return (
  //     <ImageBackground
  //       source={{
  //         uri: 'imageUrl',
  //       }}
  //       style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
  //     >
  //       <Button
  //         onPress={() => setShowStepBackTutorial(false)}
  //         icon={<Entypo name="circle-with-cross" size={32} />}
  //         raised
  //         containerStyle={{ marginBottom: 20 }}
  //         type="outline"
  //       />
  //     </ImageBackground>
  //   );
  // }

  return (
    <View style={{ ...styles.container, marginTop }}>
      {!isBarCodeScanned && <SvgBoundingBox />}
      <Camera
        ratio={cameraRatio}
        ref={ref => {
          cameraRef = ref;
        }}
        style={styles.camera}
        type={cameraType}
        onCameraReady={getSupportedRatios}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.upc_e,
          ],
        }}
      >
        {isBarCodeScanned && [
          <BoundingBox
            key="boundingBox"
            initialBoxWidth={100}
            initialBoxHeight={100}
          />,
          <Button
            key="cameraButton"
            onPress={handleCameraButtonPress}
            icon={<Entypo name="camera" size={32} />}
            raised
            type="outline"
            containerStyle={styles.cameraButton}
          />,
        ]}
      </Camera>
      {/* <BlurView tint="dark" intensity={100} style={styles.notBlurred} /> */}
    </View>
  );
}

export default CameraScreen;
