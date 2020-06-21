import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { useSafeArea } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
// import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Button from '../../components/ui/Button/Button';
import SvgBoundingBox from '../../components/SvgBoundingBox/SvgBoundingBox';
import styles from './CameraScreenStyles';
import BoundingBox from '../../components/BoundingBox/BoundingBox';
import Colors from '../../constants/Colors';
import { barCodeScanned, clearScannedLabel } from '../../store/actions/entity';
import Loading from '../../components/Loading/Loading';
import ProgressBars from '../../components/ProgressBars/ProgressBars';
import CameraTutorialOverlay from '../../components/CameraTutorialOverlay/CameraTutorialOverlay';
import { toggleDontShowAgain } from '../../store/actions';

function CameraScreen({ route, navigation }) {
  const { dataset } = route.params;
  let cameraRef;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRatio, setCameraRatio] = useState('16:9');
  const [isBarCodeScanned, setIsBarCodeScanned] = useState(false);
  const [step, setStep] = useState(0);

  const [showStepBackTutorial, setShowStepBackTutorial] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Ask for camera permission after component mounts for the first time
    // Immediately Invoked Function Expression
    (async function getCameraPermission() {
      const { status } = await Camera.requestPermissionsAsync();
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const isLoading = useSelector(state => state.ui.isLoading);
  const dontShowChecked = useSelector(
    state => state.settings.showTutorialByStep[step],
  );

  const dispatch = useDispatch();

  function handleCheckBoxPress() {
    dispatch(toggleDontShowAgain(step));
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(clearScannedLabel());
      };
    }, [dispatch]),
  );
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
    } catch (error) {}
  };

  async function handleCameraButtonPress() {
    if (cameraRef) {
      const photoObj = await cameraRef.takePictureAsync({ quality: 0 });
      setPhoto(photoObj);
      // const directoriesArray = photo.uri.split('/');
      // const fileName = directoriesArray[directoriesArray.length - 1];
      // const fileName = 'image.jpg';
      // const directory = `${FileSystem.documentDirectory}myImages/${fileName}`;
      // FileSystem.copyAsync({ from: photo.uri, to: directory });
    }
  }
  function increaseStep() {
    setStep(prevStep => prevStep + 1);
  }

  // function decreaseStep() {
  //   setStep(prevStep => prevStep - 1);
  // }

  function handleBarCodeScanned({ data }) {
    if (!isBarCodeScanned) {
      dispatch(barCodeScanned(data, dataset));
      setIsBarCodeScanned(true);
      increaseStep();
      setShowStepBackTutorial(true);
    }
  }

  function handleNextButtonPress() {
    if (step === 4) {
      navigation.navigate('Home');
    } else {
      setShowStepBackTutorial(true);
      increaseStep();
    }
  }

  function getInstructionText() {
    let instructionText;
    switch (step) {
      case 1:
        instructionText = 'Try to fit the product in the bounding box';
        break;
      case 2:
        instructionText =
          'Now go a bit back and try to fit the product in the bounding box';
        break;
      case 3:
        instructionText =
          'Now go a bit back again and try to fit the product in the bounding box';
        break;
      case 4:
        instructionText =
          'Now go a bit left and try to fit the product in the bounding box';
        break;
      default:
        break;
    }
    return instructionText;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
        {step > 0 && [
          <ProgressBars key="progressBar" currentStep={step} totalSteps={4} />,
          <View key="instructionContainer" style={styles.instructionContainer}>
            <Text style={styles.instructionText}>{getInstructionText()}</Text>
          </View>,
          <BoundingBox
            key="boundingBox"
            initialBoxWidth={100}
            initialBoxHeight={100}
            photo={photo}
            setPhoto={setPhoto}
            insets={insets}
          />,
          <Button
            raised
            key="nextButton"
            onPress={handleNextButtonPress}
            icon={
              <Entypo name="controller-next" size={32} color={Colors.primary} />
            }
            containerStyle={styles.nextButton}
          />,
          <Button
            raised
            key="cameraButton"
            onPress={handleCameraButtonPress}
            icon={<Entypo name="camera" size={32} color={Colors.primary} />}
            containerStyle={styles.cameraButton}
          />,
        ]}
        <CameraTutorialOverlay
          isVisible={showStepBackTutorial}
          onBackdropPress={() => setShowStepBackTutorial(false)}
          onCheckBoxPress={handleCheckBoxPress}
          checked={dontShowChecked}
          step={step}
        />
      </Camera>
    </View>
  );
}

export default CameraScreen;
