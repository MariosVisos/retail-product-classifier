import React from 'react';
import { View } from 'react-native';

import styles from './BoundingBoxStyles';

const BoundingBox = () => {
  const height = 200;
  const width = 200;

  return (
    // <View style={styles.container}>
    //   <View key="layerTop" style={styles.layerTop} />
    //   <View key="layerCenter" style={{ ...styles.layerCenter, height }}>
    //     <View style={styles.layerLeft} />
    //     <View style={{ ...styles.focused, width }} />
    //     <View style={styles.layerRight} />
    //   </View>
    //   <View key="layerBottom" style={styles.layerBottom} />
    // </View>
    [
      <View key="topOverlay" style={styles.topOverlay} />,
      <View key="leftOverlay" style={styles.leftOverlay} />,
      <View key="rightOverlay" style={styles.rightOverlay} />,
      <View key="bottomOverlay" style={styles.bottomOverlay} />,
      <View key="topLeftCorner" style={styles.topLeftCorner} />,
      <View key="topRightCorner" style={styles.topRightCorner} />,
      <View key="bottomLeftCorner" style={styles.bottomLeftCorner} />,
      <View key="bottomRightCorner" style={styles.bottomRightCorner} />,
    ]
  );
};

export default BoundingBox;
