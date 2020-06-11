import React from 'react';
import { View, Text } from 'react-native';
import styles from './ProgressBarsStyles';

const { container } = styles;

export default function ProgressBarsStyles() {
  return (
    <View style={container}>
      <Text>ProgressBar</Text>
    </View>
  );
}
