import React, { useRef } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styles from './CornerDragHandlerStyles';

function EdgeDragHandler({
  onGestureEvent,
  position,
  boundingBox,
  boxTop,
  boxRight,
  transX,
  transY,
}) {
  // const initY = boxTop.y + boundingBox.y - 20;

  // const transY = useRef(new Animated.Value(initY)).current;

  // let yValue;
  console.log('transY', transY);
  console.log('transX', transX);
  const edgeDragWidthPercentage = 0.8;
  const cornerDragWidthPercentage = (1 - edgeDragWidthPercentage) / 2;
  const containerStyle = {};
  const edgeStyle = {};
  const transform = [];
  // switch (position) {
  //   case 'topLeft':
  //     containerStyle.right =
  //       boxRight.x + boundingBox.x * cornerDragWidthPercentage;
  //     containerStyle.top = boxTop.y - 20;
  //     containerStyle.width = boundingBox.x * edgeDragWidthPercentage;
  //     break;
  //   case 'topRight':
  //     containerStyle.right = boxRight.x - 20;
  //     containerStyle.top = boxTop.y + boundingBox.y * cornerDragWidthPercentage;
  //     containerStyle.width = 40;
  //     containerStyle.height = boundingBox.x * edgeDragWidthPercentage + transY;
  //     edgeStyle.width = 0;
  //     edgeStyle.height = 20;
  //     break;
  //   case 'bottomRight':
  //     // containerStyle.right =
  //     // boxRight.x + boundingBox.x * cornerDragWidthPercentage;
  //     // containerStyle.top = boxTop.y + boundingBox.y - 20;
  //     // containerStyle.width = boundingBox.x * edgeDragWidthPercentage;
  //     // transform.push({ translateY: transY });
  //     break;
  //   case 'bottomLeft':
  //     containerStyle.right = boxRight.x + boundingBox.x - 20;
  //     containerStyle.top = boxTop.y + boundingBox.y * cornerDragWidthPercentage;
  //     containerStyle.width = 40;
  //     containerStyle.height = boundingBox.x * edgeDragWidthPercentage + transY;
  //     edgeStyle.width = 0;
  //     edgeStyle.height = 20;
  //     break;
  //   default:
  //     console.log('Unhandled position');
  // }

  const styleYo = { ...styles.container, ...containerStyle, transform };
  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}
    >
      <Animated.View style={styles[`${position}Container`]}>
        <View style={styles[position]} />
      </Animated.View>
    </PanGestureHandler>
  );
}

export default EdgeDragHandler;
