import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
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
            cond(eq(state, State.ACTIVE), [
              set(transX, add(x, offsetX)),
              set(transY, add(y, offsetY)),
            ]),
            cond(eq(state, State.END), [
              set(offsetX, add(offsetX, x)),
              set(offsetY, add(offsetY, y)),
            ]),
          ]),
      },
    ]);
  }
  function buildTopLeftGestureEvent(
    offsetX,
    offsetY,
    transX,
    transY,
    top,
    left,
  ) {
    return event([
      {
        nativeEvent: ({ translationX: x, translationY: y, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transX, add(transX, sub(offsetX, x))),
              set(transY, add(transY, sub(offsetY, y))),
              set(top, add(top, sub(y, offsetY))),
              set(left, add(left, sub(x, offsetX))),
              set(offsetX, x),
              set(offsetY, y),
            ]),

            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
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
  function buildBottomLeftGestureEvent(offsetX, offsetY, transX, transY, left) {
    return event([
      {
        nativeEvent: ({ translationX: x, translationY: y, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transX, add(transX, sub(offsetX, x))),
              set(transY, add(transY, sub(y, offsetY))),
              set(left, add(left, sub(x, offsetX))),
              set(offsetX, x),
              set(offsetY, y),
            ]),
            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
          ]),
      },
    ]);
  }

  const offsetX = useRef(new Value(0)).current;
  const offsetY = useRef(new Value(0)).current;
  const transX = useRef(new Value(0)).current;
  const transY = useRef(new Value(0)).current;

  const transWidth = useRef(new Value(boxX)).current;
  const transHeight = useRef(new Value(boxY)).current;

  const offsetTopLeftWidth = useRef(new Value(0)).current;
  const offsetTopLeftHeight = useRef(new Value(0)).current;

  const offsetTopRightWidth = useRef(new Value(0)).current;
  const offsetTopRightHeight = useRef(new Value(0)).current;

  const offsetBottomRightWidth = useRef(new Value(0)).current;
  const offsetBottomRightHeight = useRef(new Value(0)).current;

  const offsetBottomLeftWidth = useRef(new Value(0)).current;
  const offsetBottomLeftHeight = useRef(new Value(0)).current;

  const absoluteY = useRef(new Value((screenHeight - boxY) / 2)).current;
  const absoluteX = useRef(new Value((screenWidth - boxX) / 2)).current;

  const onGestureEvent = buildGestureEvent(offsetX, offsetY, transX, transY);

  const handleTopLeftDrag = buildTopLeftGestureEvent(
    offsetTopLeftWidth,
    offsetTopLeftHeight,
    transWidth,
    transHeight,
    absoluteY,
    absoluteX,
  );
  const handleTopRightDrag = buildTopRightGestureEvent(
    offsetTopRightWidth,
    offsetTopRightHeight,
    transWidth,
    transHeight,
    absoluteY,
  );
  const handleBottomRightDrag = buildBottomRightGestureEvent(
    offsetBottomRightWidth,
    offsetBottomRightHeight,
    transWidth,
    transHeight,
  );
  const handleBottomLeftDrag = buildBottomLeftGestureEvent(
    offsetBottomLeftWidth,
    offsetBottomLeftHeight,
    transWidth,
    transHeight,
    absoluteX,
  );

  const centerPadding = useRef(new Value(88)).current;
  const centerWidth = sub(transWidth, centerPadding);

  const centerHeight = sub(transHeight, centerPadding);

  const { center } = styles;

  const animatedStyles = {
    top: absoluteY,
    left: absoluteX,
    width: transWidth,
    height: transHeight,
  };

  const transformStyles = {
    transform: [
      {
        translateX: transX,
      },
      {
        translateY: transY,
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyles, transformStyles]}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View
          style={[center, { width: centerWidth, height: centerHeight }]}
        />
      </PanGestureHandler>

      <CornerDragHandler
        onGestureEvent={handleTopLeftDrag}
        position="topLeft"
      />
      <CornerDragHandler
        onGestureEvent={handleTopRightDrag}
        position="topRight"
      />
      <CornerDragHandler
        onGestureEvent={handleBottomRightDrag}
        position="bottomRight"
      />
      <CornerDragHandler
        onGestureEvent={handleBottomLeftDrag}
        position="bottomLeft"
      />
    </Animated.View>
  );
};

export default BoundingBox;
