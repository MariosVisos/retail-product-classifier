import React, { useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import CornerDragHandler from '../CornerDragHandler/CornerDragHandler';
import styles from './BoundingBoxStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const { cond, eq, add, set, Value, event, block, Extrapolate } = Animated;
const BoundingBox = () => {
  const boxX = 200;
  const boxY = 200;

  // const interaction = (gestureTranslation, gestureState) => {
  //   const { dragX, dragY, offsetX, offsetY } = gestureTranslation;
  //   const transX = cond(
  //     eq(gestureState, State.ACTIVE),
  //     add(offsetX, dragX),
  //     set(offsetX, add(offsetX, dragX)),
  //   );
  //   const transY = cond(
  //     eq(gestureState, State.ACTIVE),
  //     add(offsetY, dragY),
  //     set(offsetY, add(offsetY, dragY)),
  //   );
  //   return [transX, transY];
  // };

  function buildGestureEvent(offsetX, offsetY, transX, transY) {
    return event([
      {
        nativeEvent: ({ translationX: x, translationY: y, state }) =>
          block([
            set(transX, add(x, offsetX)),
            set(transY, add(y, offsetY)),
            cond(eq(state, State.END), [
              set(offsetX, add(offsetX, x)),
              set(offsetY, add(offsetY, y)),
            ]),
          ]),
      },
    ]);
  }

  // const getGestureEvent = (dragX, dragY, gestureState) => {
  //   return event([
  //     {
  //       nativeEvent: {
  //         translationX: dragX,
  //         translationY: dragY,
  //         state: gestureState,
  //       },
  //     },
  //   ]);
  // };

  // const dragX = useRef(new Value(0)).current;
  // const dragY = useRef(new Value(0)).current;
  const transX = useRef(new Value(0)).current;
  const transY = useRef(new Value(0)).current;
  const offsetX = useRef(new Value((screenWidth - boxX) / 2)).current;
  const offsetY = useRef(new Value((screenHeight - boxY) / 2)).current;
  const gestureState = useRef(new Value(-1)).current;

  // const dragCornerX = useRef(new Value(0)).current;
  // const dragCornerY = useRef(new Value(0)).current;
  const transCornerX = useRef(new Value(0)).current;
  const transCornerY = useRef(new Value(0)).current;
  const offsetCornerX = useRef(new Value((screenWidth - boxX) / 2)).current;
  const offsetCornerY = useRef(new Value((screenHeight - boxY) / 2)).current;
  // const gestureCornerState = useRef(new Value(-1)).current;

  // const onGestureEvent = getGestureEvent(dragX, dragY, gestureState);
  const onGestureEvent = buildGestureEvent(offsetX, offsetY, transX, transY);
  const handleBottomRightDrag = buildGestureEvent(
    offsetCornerX,
    offsetCornerY,
    transCornerX,
    transCornerY,
  );

  // const onGestureCornerEvent = getGestureEvent(
  //   dragCornerX,
  //   dragCornerY,
  //   gestureState,
  // );
  // const [transX, transY] = interaction(
  //   { dragX, dragY, offsetX, offsetY },
  //   gestureState,
  // );
  // const [transCornerX, transCornerY] = interaction(
  //   {
  //     dragX: dragCornerX,
  //     dragY: dragCornerY,
  //     offsetX: offsetCornerX,
  //     offsetY: offsetCornerY,
  //   },
  //   gestureState,
  // );

  // const boundingBox = {
  //   x: boxX,
  //   y: boxY,
  // };
  // const boxTopX = screenWidth;
  // const boxTopY = (screenHeight - boxY) / 2;
  // const transBoxTopX = useRef(new Value(0)).current;
  // const offsetBoxTopX = useRef(new Value(boxTopX)).current;
  // const transBoxTopY = useRef(new Value(0)).current;
  // const offsetBoxTopY = useRef(new Value(boxTopY)).current;

  // const boxBottomX = screenWidth;

  // const boxBottomY = (screenHeight - boxY) / 2;
  // const dragBoxBottomX = useRef(new Value(0)).current;
  // const dragBoxBottomY = useRef(new Value(0)).current;
  // const offsetBoxBottomX = useRef(new Value(boxBottomX)).current;
  // const offsetBoxBottomY = useRef(new Value(boxBottomY)).current;
  // const boxBottomYGestureState = useRef(new Value(-1)).current;

  // const boxBottomTop = boxTopY + boxY - 20;
  // const dragBoxBottomTop = useRef(new Value(0)).current;
  // const offsetBoxBottomTop = useRef(new Value(boxBottomTop)).current;
  // const boxBottomTopGestureState = useRef(new Value(-1)).current;

  // const transBoxBottomY = cond(
  //   eq(boxBottomTopGestureState, State.ACTIVE),
  //   add(offsetBoxBottomY, dragBoxBottomTop),
  //   set(offsetBoxBottomY, add(offsetBoxBottomY, dragBoxBottomTop)),
  // );
  // const transBoxBottomTop = cond(
  //   eq(boxBottomTopGestureState, State.ACTIVE),
  //   add(offsetBoxBottomTop, dragBoxBottomTop),
  //   set(offsetBoxBottomTop, add(offsetBoxBottomTop, dragBoxBottomTop)),
  // );

  // const boxLeftX = (screenWidth - boxX) / 2;
  // const boxLeftY = (screenHeight - boxY) / 2;

  // const boxRightX = (screenWidth - boxX) / 2;
  // const boxRightY = (screenHeight - boxY) / 2;
  // const initialBoxTop = {
  //   x: boxTopX,
  //   y: boxTopY,
  // };

  // const initialBoxRight = {
  //   x: boxRightX,
  //   y: boxRightY,
  // };
  // const initialBoxBottom = {
  //   x: boxBottomX,
  //   y: boxBottomY,
  // };
  // const initialBoxLeft = {
  //   x: boxLeftX,
  //   y: boxLeftY,
  // };

  const { center } = styles;

  return (
    <Animated.View
      style={[
        styles.container,
        { width: transCornerX, height: transCornerY },
        {
          transform: [
            {
              translateX: transX,
            },
            {
              translateY: transY,
            },
          ],
        },
      ]}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View style={center} />
      </PanGestureHandler>
      {/* <CornerDragHandler position="topLeft" />
      <CornerDragHandler position="topRight" />
      */}
      <CornerDragHandler
        onGestureEvent={handleBottomRightDrag}
        position="bottomRight"
      />
      <CornerDragHandler
        // onGestureEvent={onGestureCornerEvent}
        position="bottomLeft"
      />
    </Animated.View>
  );
};

export default BoundingBox;
