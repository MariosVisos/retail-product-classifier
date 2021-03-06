import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Platform, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useSafeArea } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Button from '../../components/ui/Button/Button';
import BarCodeScan from '../../components/BarCodeScan/BarCodeScan';
import styles from './CameraScreenStyles';
import BoundingBox from '../../components/BoundingBox/BoundingBox';
import NearbyStores from '../../components/NearbyStores/NearbyStores';
import Colors from '../../constants/Colors';
import { barCodeScanned, clearScannedLabel } from '../../store/actions/entity';
import Loading from '../../components/Loading/Loading';
import ProgressBars from '../../components/ProgressBars/ProgressBars';
import CameraTutorialOverlay from '../../components/CameraTutorialOverlay/CameraTutorialOverlay';
import { toggleDontShowAgain } from '../../store/actions';
import {
  buildGetPhotoByReferenceUrl,
  buildSearchLocationUrl,
} from '../../utils/googlePlaces';
import EntityCreateOverlay from '../../components/EntityCreateOverlay/EntityCreateOverlay';

function CameraScreen({ route, navigation }) {
  const { dataset } = route.params;
  let cameraRef;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRatio, setCameraRatio] = useState('16:9');
  const [isBarCodeScanned, setIsBarCodeScanned] = useState(false);
  const [step, setStep] = useState(0);

  const [showStepBackTutorial, setShowStepBackTutorial] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [nearbyStores, setNearbyStores] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Ask for camera permission after component mounts for the first time
    // Immediately Invoked Function Expression
    (async function getCameraPermission() {
      const { status: camPermission } = await Camera.requestPermissionsAsync();
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const {
        status: locationPermission,
      } = await Location.requestPermissionsAsync();
      const locationPermissionGranted = locationPermission === 'granted';
      const camPermissionGranted = camPermission === 'granted';
      setHasPermission(camPermissionGranted && locationPermissionGranted);
      if (locationPermissionGranted) {
        const locationInfo = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = locationInfo.coords;
        const searchPlaceUrl = buildSearchLocationUrl(latitude, longitude);
        const response = await axios.get(searchPlaceUrl);
        const stores = [];
        response.data.results.forEach(storeObj => {
          const { name, photos } = storeObj;
          let photoUrl;
          if (photos) {
            photoUrl = buildGetPhotoByReferenceUrl(photos[0].photo_reference);
          }
          const store = {
            name,
            photoUrl,
          };
          stores.push(store);
        });
        if (stores.length > 0) {
          setNearbyStores(stores);
        } else {
          setNearbyStores(null);
        }
        setLocation(locationInfo);
      }
    })();
  }, []);

  const isLoading = useSelector(state => state.ui.isLoading);
  const dontShowChecked = useSelector(
    state => state.settings.showTutorialByStep[step],
  );
  const scannedLabel = useSelector(state => state.entity.scannedLabel);

  const dispatch = useDispatch();

  function movePlaceToFront(selectedIndex) {
    setNearbyStores(prevStores => {
      const newStores = [];
      prevStores.forEach((store, index) => {
        if (selectedIndex === index) {
          newStores.unshift(store);
        } else {
          newStores.push(store);
        }
      });
      return newStores;
    });
  }

  function handleCheckBoxPress() {
    dispatch(toggleDontShowAgain(step));
  }

  function setLocationStoreName(store) {
    setLocation(prevLocation => ({ ...prevLocation, store }));
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
    } catch (error) {
      console.log('getSupportedRatios -> error', error);
    }
  };

  async function handleCameraButtonPress() {
    if (cameraRef) {
      const photoObj = await cameraRef.takePictureAsync({ quality: 0 });
      photoObj.location = location;
      let angle = 1;
      if (step === 2 || step === 5) {
        angle = 2;
      }
      if (step === 3 || step === 6) {
        angle = 3;
      }
      photoObj.angle = angle;
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
    dispatch(barCodeScanned(data, dataset));
    setIsBarCodeScanned(true);
    increaseStep();
    setShowStepBackTutorial(true);
  }

  function handleNextButtonPress() {
    if (step === 6) {
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
        instructionText = 'Now please move a bit to the LEFT';
        break;
      case 3:
        instructionText = 'Now please move a bit to the RIGHT';
        break;
      case 4:
        instructionText =
          'Now move a bit back and try to fit the product in the bounding box from the center';
        break;
      case 5:
        instructionText = 'Now please move a bit to the LEFT again';
        break;
      case 6:
        instructionText = 'Now please move a bit to the RIGHT again';
        break;
      default:
        break;
    }
    return instructionText;
  }

  function handleStorePress(storeIndex) {
    movePlaceToFront(storeIndex);
  }

  function handleConfirmPress(storeIndex) {
    if (storeIndex === null) {
      setLocationStoreName('Unknown');
    } else {
      setLocationStoreName(nearbyStores[storeIndex].name);
    }
    setNearbyStores(null);
  }

  function handleCancelPress() {
    navigation.goBack();
  }

  if (isLoading || (!nearbyStores && !location)) {
    return <Loading />;
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Access to both camera and location are needed!</Text>;
  }

  if (nearbyStores) {
    return (
      <View style={{ marginTop }}>
        <NearbyStores
          stores={nearbyStores}
          onStorePress={handleStorePress}
          onConfirmPress={handleConfirmPress}
        />
      </View>
    );
  }
  const relationshipEntity = { type: 'dataset', id: dataset.id };

  return (
    <View style={{ ...styles.container, marginTop }}>
      {!isBarCodeScanned && <BarCodeScan />}

      <Camera
        ratio={cameraRatio}
        ref={ref => {
          cameraRef = ref;
        }}
        style={styles.camera}
        type={cameraType}
        onCameraReady={getSupportedRatios}
        onBarCodeScanned={isBarCodeScanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.upc_e,
          ],
        }}
      >
        {!!(!(scannedLabel && scannedLabel.name) && isBarCodeScanned) && (
          <EntityCreateOverlay
            isVisible={
              !!(!(scannedLabel && scannedLabel.name) && isBarCodeScanned)
            }
            toggleOverlay={() => {}}
            entityType="label"
            relationshipEntity={relationshipEntity}
            onCancelPress={handleCancelPress}
            headerTitle="Product not found! Please add the product manually"
            gtin={scannedLabel && scannedLabel.gtin}
          />
        )}

        {step > 0 && [
          <ProgressBars key="progressBar" currentStep={step} totalSteps={6} />,
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
          isVisible={
            !!(scannedLabel && scannedLabel.name && showStepBackTutorial)
          }
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
