import React, { useRef } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import BoundingBoxProperties from '../../constants/BoundingBoxProperties';
import styles from './DragHandlerStyles';

function DragHandler({ transWidth, transHeight, onGestureEvent, position }) {
  const { Value, sub } = Animated;
  const { cornerDragArea } = BoundingBoxProperties.corner;
  const cornerDragAreaEdge = Math.sqrt(cornerDragArea);
  const cornerDragWidth = useRef(new Value(cornerDragAreaEdge + 10)).current;
  const edgeDragWidth = sub(transWidth, cornerDragWidth);
  const cornerDragHeight = useRef(new Value(cornerDragAreaEdge + 10)).current;
  const edgeDragHeight = sub(transHeight, cornerDragHeight);
  const edgeDragHandlerStyles = {};

  switch (position) {
    case 'top':
      edgeDragHandlerStyles.width = edgeDragWidth;
      break;
    case 'right':
      edgeDragHandlerStyles.height = edgeDragHeight;
      break;
    case 'bottom':
      edgeDragHandlerStyles.width = edgeDragWidth;
      break;
    case 'left':
      edgeDragHandlerStyles.height = edgeDragHeight;
      break;

    // no default
  }

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}
    >
      <Animated.View
        style={[styles[`${position}Container`], edgeDragHandlerStyles]}
      >
        <View style={styles[position]} />
      </Animated.View>
    </PanGestureHandler>
  );
}

export default DragHandler;
