import React from 'react';
import { View } from 'react-native';

import styles from './LabelScreenStyles';
import ImageList from '../../components/ImageList/ImageList';

const LabelScreen = ({ navigation, route }) => {
  const { container } = styles;

  const { label } = route.params;

  return (
    <View style={container}>
      <ImageList navigation={navigation} label={label} />
    </View>
  );
};

export default LabelScreen;
