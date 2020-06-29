import React, { useState } from 'react';
import { ActivityIndicator, View, ImageBackground, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Image, Icon, Overlay, Card } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';

import styles from './ImageScreenStyles';
import { baseUrl } from '../../constants/api';
import Button from '../../components/ui/Button/Button';
import Colors from '../../constants/Colors';

const {
  container,
  imageStyle,
  imageContainer,
  overlayImage,
  overlayContainer,
  cancelButtonContainer,
  maximizeIcon,
  propertiesContainer,
  cardStyle,
  propertyText,
  valuesContainer,
  valueText,
  propertyKeysContainer,
  valueTextContainer,
  dividerStyle,
} = styles;

const ImageScreen = ({ route }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const image = useSelector(
    state => state.entity.image.byId[route.params.imageId],
  );
  const label = useSelector(state => state.entity.label.byId[image.labelId]);
  function toggleImageOverlay() {
    setIsOverlayVisible(prevIsOverlayVisible => !prevIsOverlayVisible);
  }
  const { name, metaData } = image;
  const { deviceInfo } = metaData;
  return (
    <View style={container}>
      <Card
        dividerStyle={dividerStyle}
        title={label.name}
        containerStyle={cardStyle}
      >
        <TouchableWithoutFeedback
          onPress={toggleImageOverlay}
          style={imageContainer}
        >
          <ImageBackground
            style={imageStyle}
            source={{
              uri: `${baseUrl}/image/${label.name}/${image.id}`,
            }}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color={Colors.secondary} />}
          >
            <Icon
              reverse
              reverseColor={Colors.secondary}
              containerStyle={maximizeIcon}
              name="maximize-2"
              type="feather"
              onPress={toggleImageOverlay}
              raised
              size={20}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableWithoutFeedback>
        <ScrollView>
          <View style={propertiesContainer}>
            <View style={propertyKeysContainer}>
              <Text style={propertyText}>Filename</Text>
              <Text style={propertyText}>Label</Text>
              <Text style={propertyText}>Phone brand</Text>
              <Text style={propertyText}>Phone manufacturer</Text>
              <Text style={propertyText}>Phone model</Text>
              <Text style={propertyText}>Device year class</Text>
              <Text style={propertyText}>OS name</Text>
              <Text style={propertyText}>OS version</Text>
            </View>
            <View style={valuesContainer}>
              <View style={valueTextContainer}>
                <Text style={valueText}>{name}</Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {label.name}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text style={valueText}>{deviceInfo.brand}</Text>
              </View>
              <View style={valueTextContainer}>
                <Text style={valueText}>{deviceInfo.manufacturer}</Text>
              </View>
              <View style={valueTextContainer}>
                <Text style={valueText}>{deviceInfo.modelName}</Text>
              </View>
              <View style={valueTextContainer}>
                <Text style={valueText}>{deviceInfo.deviceYearClass}</Text>
              </View>
              <View style={valueTextContainer}>
                <Text style={valueText}>{deviceInfo.osName}</Text>
              </View>
              <View style={valueTextContainer}>
                <Text style={valueText}>{deviceInfo.osVersion}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Card>
      <Overlay
        isVisible={isOverlayVisible}
        onBackdropPress={toggleImageOverlay}
        overlayStyle={overlayContainer}
      >
        <View>
          <Image
            style={overlayImage}
            source={{
              uri: `${baseUrl}/image/${label.name}/${image.id}`,
            }}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color={Colors.secondary} />}
          />
          <Button
            onPress={toggleImageOverlay}
            containerStyle={cancelButtonContainer}
            icon={<Entypo name="cross" size={32} color={Colors.black} />}
            raised
            type="outline"
          />
        </View>
      </Overlay>
    </View>
  );
};

export default ImageScreen;
