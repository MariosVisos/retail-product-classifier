import React from 'react';
import { View } from 'react-native';

import styles from './LabelScreenStyles';
import ImageList from '../../components/ImageList/ImageList';

const LabelScreen = ({ navigation }) => {
  const { container } = styles;

  return (
    <View style={container}>
      <ImageList navigation={navigation} />
    </View>
  );
};

export default LabelScreen;
