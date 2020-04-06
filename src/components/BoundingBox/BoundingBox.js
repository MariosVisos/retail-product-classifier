import React, { useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import CornerDragHandler from '../CornerDragHandler/CornerDragHandler';
import styles from './BoundingBoxStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const { cond, eq, add, set, Value, event, block, sub } = Animated;
const BoundingBox = () => {
  const boxX = 200;
  const boxY = 200;

  function buildGestureEvent(offsetX, offsetY, transX, transY) {
    return event([
      {
        nativeEvent: ({ translationX: x, translationY: y, state }) =>
          block([
            // cond(eq(state, State.ACTIVE), [
            set(transX, add(x, offsetX)),
            set(transY, add(y, offsetY)),
            // ]),
            cond(eq(state, State.END), [
              set(offsetX, add(offsetX, x)),
              set(offsetY, add(offsetY, y)),
            ]),
          ]),
      },
    ]);
  }
  function buildTopRightGestureEvent(offsetX, offsetY, transX, transY, top) {
    return event([
      {
        nativeEvent: ({ translationX: x, translationY: y, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transX, add(transX, sub(x, offsetX))),
              set(transY, add(transY, sub(offsetY, y))),
              set(top, add(top, sub(y, offsetY))),
              set(offsetX, x),
              set(offsetY, y),
            ]),

            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
          ]),
      },
    ]);
  }
  function buildBottomRightGestureEvent(offsetX, offsetY, transX, transY) {
    return event([
      {
        nativeEvent: ({ translationX: x, translationY: y, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transX, add(transX, sub(x, offsetX))),
              set(transY, add(transY, sub(y, offsetY))),
              set(offsetX, x),
              set(offsetY, y),
            ]),
            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
          ]),
      },
    ]);
  }
  // function buildBottomLeftGestureEvent(offsetX, offsetY, transX, transY, left) {
  //   return event([
  //     {
  //       nativeEvent: ({ translationX: x, translationY: y, state }) =>
  //         block([
  //           set(transX, sub(offsetX, x)),
  //           set(transY, add(y, offsetY)),
  //           // cond(eq(state, State.ACTIVE), [set(left, add(x, left))]),
  //           cond(eq(state, State.END), [
  //             set(offsetX, sub(offsetX, x)),
  //             set(offsetY, add(offsetY, y)),
  //           ]),
  //         ]),
  //     },
  //   ]);
  // }

  const offsetX = useRef(new Value(0)).current;
  const offsetY = useRef(new Value(0)).current;
  const transX = useRef(new Value(0)).current;
  const transY = useRef(new Value(0)).current;

  const transWidth = useRef(new Value(boxX)).current;
  const transHeight = useRef(new Value(boxY)).current;
  const offsetWidth = useRef(new Value(0)).current;
  const offsetHeight = useRef(new Value(0)).current;
  const offsetTopRightWidth = useRef(new Value(0)).current;
  const offsetTopRightHeight = useRef(new Value(0)).current;

  const absoluteY = useRef(new Value((screenHeight - boxY) / 2)).current;
  const absoluteX = useRef(new Value((screenWidth - boxX) / 2)).current;

  const transBottomLeftX = useRef(new Value(0)).current;
  const transBottomLeftY = useRef(new Value(0)).current;
  const offsetBottomLeftX = useRef(new Value(0)).current;
  const offsetBottomLeftY = useRef(new Value(0)).current;

  const screenHeightNode = useRef(new Value(screenHeight)).current;

  const onGestureEvent = buildGestureEvent(offsetX, offsetY, transX, transY);
  const handleTopRightDrag = buildTopRightGestureEvent(
    offsetTopRightWidth,
    offsetTopRightHeight,
    transWidth,
    transHeight,
    absoluteY,
    screenHeightNode,
  );
  const handleBottomRightDrag = buildBottomRightGestureEvent(
    offsetWidth,
    offsetHeight,
    transWidth,
    transHeight,
    absoluteY,
    screenHeightNode,
  );

  // const handleBottomLeftDrag = buildBottomLeftGestureEvent(
  //   offsetWidth,
  //   offsetHeight,
  //   transWidth,
  //   transHeight,
  //   absoluteX,
  // );

  const centerPadding = useRef(new Value(88)).current;
  const centerWidth = sub(transWidth, centerPadding);

  const centerHeight = sub(transHeight, centerPadding);
  // const top = sub(screenHeightNode, bottom);

  const { center } = styles;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: absoluteY,
          left: absoluteX,
          width: transWidth,
          height: transHeight,
        },
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
        <Animated.View
          style={[center, { width: centerWidth, height: centerHeight }]}
        />
      </PanGestureHandler>
      {/* <CornerDragHandler position="topLeft" />
      <CornerDragHandler position="topRight" />
      */}
      <CornerDragHandler
        // onGestureEvent={handleBottomLeftDrag}
        position="topLeft"
      />
      <CornerDragHandler
        onGestureEvent={handleTopRightDrag}
        position="topRight"
      />
      <CornerDragHandler
        // onGestureEvent={handleBottomLeftDrag}
        position="bottomLeft"
      />
      <CornerDragHandler
        onGestureEvent={handleBottomRightDrag}
        position="bottomRight"
      />
    </Animated.View>
  );
};

export default BoundingBox;
