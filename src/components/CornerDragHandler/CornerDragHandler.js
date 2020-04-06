import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styles from './CornerDragHandlerStyles';

function EdgeDragHandler({ onGestureEvent, position }) {
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
