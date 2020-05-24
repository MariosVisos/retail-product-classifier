import React from 'react';
import { View } from 'react-native';

import styles from './LabelScreenStyles';
import ImageList from '../../components/ImageList/ImageList';

const LabelScreen = ({ navigation, route }) => {
  const { container } = styles;

  const { id, name } = route.params.label;
  const relationshipEntity = { type: 'label', id, name };

  return (
    <View style={container}>
      <ImageList
        navigation={navigation}
        relationshipEntity={relationshipEntity}
      />
    </View>
  );
};

export default LabelScreen;
