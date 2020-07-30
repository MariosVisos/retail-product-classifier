import React, { useState } from 'react';
import { ActivityIndicator, View, ImageBackground, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Overlay, Card } from 'react-native-elements';
import { format } from 'date-fns';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';

import styles from './ImageScreenStyles';
import { baseUrl } from '../../constants/api';
import Button from '../../components/ui/Button/Button';
import Colors from '../../constants/Colors';
import { deleteEntity } from '../../store/actions/entity';

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

const ImageScreen = ({ navigation, route }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const image = useSelector(
    state => state.entity.image.byId[route.params.imageId],
  );
  const dispatch = useDispatch();
  const label = useSelector(
    state => image && state.entity.label.byId[image.labelId],
  );
  const dataset = useSelector(
    state => label && state.entity.dataset.byId[label.datasetId],
  );
  if (!image) {
    return <Text>Image deleted!</Text>;
  }
  function toggleImageOverlay() {
    setIsOverlayVisible(prevIsOverlayVisible => !prevIsOverlayVisible);
  }
  const { angle, name, metaData, dimensions, createdAt } = image;
  let angleText = 'Center';
  if (angle === '2') {
    angleText = 'Left';
  } else if (angle === '3') {
    angleText = 'Right';
  }

  function handleDeletePress() {
    const entity = { id: image.id, type: image.type };
    const relationshipEntity = { id: label.id, type: label.type };
    navigation.navigate('Dataset', {
      dataset,
    });
    dispatch(deleteEntity(entity, relationshipEntity));
  }

  const { deviceInfo, location, user } = metaData;
  return (
    <View style={container}>
      <Card
        dividerStyle={dividerStyle}
        title={label.name}
        containerStyle={cardStyle}
      >
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={toggleImageOverlay}
            style={imageContainer}
          >
            <ImageBackground
              style={imageStyle}
              source={{
                uri: `${baseUrl}/image/${label.id}/${image.id}`,
              }}
              resizeMode="cover"
              PlaceholderContent={
                <ActivityIndicator color={Colors.secondary} />
              }
            >
              {/* <Icon
              reverse
              reverseColor={Colors.secondary}
              containerStyle={maximizeIcon}
              name="maximize-2"
              type="feather"
              raised
              size={20}
              onPress={toggleImageOverlay}
              color={Colors.primary}
            /> */}
            </ImageBackground>
          </TouchableWithoutFeedback>

          <View style={propertiesContainer}>
            <View style={propertyKeysContainer}>
              <Text style={propertyText}>Filename</Text>
              <Text style={propertyText}>Label</Text>
              <Text style={propertyText}>Store</Text>
              <Text style={propertyText}>Width</Text>
              <Text style={propertyText}>Height</Text>
              <Text style={propertyText}>Angle</Text>
              <Text style={propertyText}>Created at</Text>
              <Text style={propertyText}>User id</Text>
              <Text style={propertyText}>User email</Text>
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
                <Text numberOfLines={1} style={valueText}>
                  {location.store}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {dimensions.width}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {dimensions.height}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {angleText}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {format(createdAt, 'dd.MM.yyyy HH:mm')}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {user.id}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {user.email}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {deviceInfo.brand}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {deviceInfo.manufacturer}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {deviceInfo.modelName}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {deviceInfo.deviceYearClass}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {deviceInfo.osName}
                </Text>
              </View>
              <View style={valueTextContainer}>
                <Text numberOfLines={1} style={valueText}>
                  {deviceInfo.osVersion}
                </Text>
              </View>
            </View>
          </View>
          <Button
            icon={<FontAwesome5 name="trash" size={20} color={Colors.black} />}
            title="Delete image"
            onPress={handleDeletePress}
          />
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
              uri: `${baseUrl}/image/${label.id}/${image.id}`,
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
