import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './NoImageStyles';
import Colors from '../../constants/Colors';

const NoImage = () => {
  const { container, noImageText } = styles;
  return (
    <View style={container}>
      <FontAwesome name="photo" size={22} color={Colors.blackLight} />
      <Text style={noImageText}>No image</Text>
    </View>
  );
};

export default NoImage;
