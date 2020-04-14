import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import Svg, { Defs, Rect, Mask } from 'react-native-svg';
// import { useHeaderHeight } from '@react-navigation/stack';
import styles from './SvgBoundingBoxStyles';
import Colors from '../../constants/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
// const QR_SCAN_SQUARE_SIZE = 200;
const x = 200;
const y = 200;

const SvgBoundingBox = () => {
  // const headerHeight = useHeaderHeight();
  return (
    <View
      style={{ ...styles.layout, height: screenHeight, width: screenWidth }}
    >
      <Text style={styles.topText}>Scan the product barcode</Text>
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect
              height="100%"
              width="100%"
              fill={Colors.primary}
              opacity={0.4}
            />
            <Rect
              x={screenWidth / 2 - x / 2}
              y={screenHeight / 2 - y / 2}
              // rx="50"
              // ry="50"
              width={x}
              height={y}
              stroke={Colors.primary}
              strokeWidth="0.2"
              fill-opacity="1"
              fill="black"
            />
          </Mask>
        </Defs>
        <Rect height="100%" width="100%" mask="url(#mask)" fill="black" />
      </Svg>
    </View>
  );
};

export default SvgBoundingBox;
