import React from 'react';
import { View, Text } from 'react-native';
import styles from './DatasetScreenStyles';

const DatasetScreen = () => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Dataset screen</Text>
    </View>
  );
};

export default DatasetScreen;
