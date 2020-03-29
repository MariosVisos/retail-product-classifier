import React from 'react';
import { View } from 'react-native';
import styles from './BoundingBoxStyles';

const BoundingBox = () => {
  const height = 200;
  const width = 200;
  return (
    <View style={styles.container}>
      <View key="layerTop" style={styles.layerTop} />
      <View key="layerCenter" style={{ ...styles.layerCenter, height }}>
        <View style={styles.layerLeft} />
        <View style={{ ...styles.focused, width }} />
        <View style={styles.layerRight} />
      </View>
      <View key="layerBottom" style={styles.layerBottom} />
    </View>
  );
};

export default BoundingBox;
