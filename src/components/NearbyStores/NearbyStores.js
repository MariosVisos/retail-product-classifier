import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements';
import styles from './NearbyStoresStyles';
import Colors from '../../constants/Colors';
import Button from '../ui/Button/Button';

const {
  container,
  storeContainer,
  imageStyle,
  selectedStoreContainer,
  questionText,
  selectedImageStyle,
  selectedStoreTitleText,
  storeTitleText,
  noImage,
  noImageText,
  confirmButton,
  confirmText,
  chooseStoreText,
} = styles;

const NearbyStores = ({ stores, onStorePress, onConfirmPress }) => {
  return (
    <ScrollView contentContainerStyle={container}>
      <Text style={questionText}>Are you in this store?</Text>
      {stores.map((store, index) => {
        const { name, photoUrl } = store;
        let storeElement;
        if (index === 0) {
          storeElement = [
            <View key={photoUrl + name} style={selectedStoreContainer}>
              <Text style={selectedStoreTitleText}>{name}</Text>
              <Image
                source={{ uri: photoUrl }}
                containerStyle={photoUrl ? selectedImageStyle : noImage}
                PlaceholderContent={
                  <ActivityIndicator color={Colors.secondary} />
                }
              />
              {!photoUrl && <Text style={noImageText}>No image</Text>}
            </View>,
            <Text key="confirmText" style={confirmText}>
              Please confirm that the above location is correct
            </Text>,
            <Button
              key="confirmButton"
              containerStyle={confirmButton}
              title="Confirm store location"
              onPress={() => onConfirmPress(index)}
            />,
            <Text style={chooseStoreText} key="chooseStoreText">
              If not, please choose from the stores below
            </Text>,
          ];
        } else {
          storeElement = (
            <TouchableOpacity
              key={photoUrl + name}
              onPress={() => onStorePress(index)}
              style={storeContainer}
            >
              <Text style={storeTitleText}>{name}</Text>
              <Image
                source={{ uri: photoUrl }}
                style={photoUrl ? imageStyle : noImage}
                PlaceholderContent={
                  <ActivityIndicator color={Colors.secondary} />
                }
              />
              {!photoUrl && <Text style={noImageText}>No image</Text>}
            </TouchableOpacity>
          );
        }
        return storeElement;
      })}
      <Button
        containerStyle={confirmButton}
        title="None of the above"
        onPress={() => onConfirmPress(null)}
      />
    </ScrollView>
  );
};

export default NearbyStores;
