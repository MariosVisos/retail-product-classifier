import React from 'react';
import { View } from 'react-native';
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
}) {
  const edgeDragWidthPercentage = 0.8;
  const cornerDragWidthPercentage = (1 - edgeDragWidthPercentage) / 2;
  const containerStyle = {};
  const edgeStyle = {};
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
      containerStyle.height =
        boundingBox.x * edgeDragWidthPercentage + translationY;
      edgeStyle.width = 0;
      edgeStyle.height = 20;
      break;
    case 'bottom':
      containerStyle.right =
        boxRight.x + boundingBox.x * cornerDragWidthPercentage;
      containerStyle.top = boxTop.y + boundingBox.y - 20 + translationY;
      containerStyle.width = boundingBox.x * edgeDragWidthPercentage;
      break;
    case 'left':
      containerStyle.right = boxRight.x + boundingBox.x - 20;
      containerStyle.top = boxTop.y + boundingBox.y * cornerDragWidthPercentage;
      containerStyle.width = 40;
      containerStyle.height =
        boundingBox.x * edgeDragWidthPercentage + translationY;
      edgeStyle.width = 0;
      edgeStyle.height = 20;
      break;
    default:
      console.log('Unhandled position');
  }
  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View
        style={{
          ...styles.container,
          ...containerStyle,
        }}
      >
        <View style={{ ...styles.edge, ...edgeStyle }} />
      </View>
    </PanGestureHandler>
  );
}

export default EdgeDragHandler;
