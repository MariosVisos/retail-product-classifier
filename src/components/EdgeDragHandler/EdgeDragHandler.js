import React, { useRef } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styles from './EdgeDragHandlerStyles';

function EdgeDragHandler({
  onGestureEvent,
  onHandlerStateChange,
  translationY,
  position,
  boundingBox,
  boxTop,
  boxRight,
  transX,
  transY,
}) {
  // const initY = boxTop.y + boundingBox.y - 20;

  // const transY = useRef(new Animated.Value(initY)).current;

  let yValue;
  console.log('transY', transY);
  console.log('transX', transX);
  const edgeDragWidthPercentage = 0.8;
  const cornerDragWidthPercentage = (1 - edgeDragWidthPercentage) / 2;
  const containerStyle = {};
  const edgeStyle = {};
  const transform = [];
  switch (position) {
    case 'top':
      containerStyle.right =
        boxRight.x + boundingBox.x * cornerDragWidthPercentage;
      containerStyle.top = boxTop.y - 20;
      containerStyle.width = boundingBox.x * edgeDragWidthPercentage;
      break;
    case 'right':
      containerStyle.right = boxRight.x - 20;
      containerStyle.top = boxTop.y + boundingBox.y * cornerDragWidthPercentage;
      containerStyle.width = 40;
      containerStyle.height = boundingBox.x * edgeDragWidthPercentage + transY;
      edgeStyle.width = 0;
      edgeStyle.height = 20;
      break;
    case 'bottom':
      containerStyle.right =
        boxRight.x + boundingBox.x * cornerDragWidthPercentage;
      // containerStyle.top = boxTop.y + boundingBox.y - 20;
      containerStyle.width = boundingBox.x * edgeDragWidthPercentage;
      transform.push({ translateY: transY });
      break;
    case 'left':
      containerStyle.right = boxRight.x + boundingBox.x - 20;
      containerStyle.top = boxTop.y + boundingBox.y * cornerDragWidthPercentage;
      containerStyle.width = 40;
      containerStyle.height = boundingBox.x * edgeDragWidthPercentage + transY;
      edgeStyle.width = 0;
      edgeStyle.height = 20;
      break;
    default:
      console.log('Unhandled position');
  }
  console.log('position', position);

  const styleYo = { ...styles.container, ...containerStyle, transform };
  console.log('styleYo', styleYo);
  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}
    >
      <Animated.View style={styleYo}>
        <View style={{ ...styles.edge, ...edgeStyle }} />
      </Animated.View>
    </PanGestureHandler>
  );
}

export default EdgeDragHandler;
