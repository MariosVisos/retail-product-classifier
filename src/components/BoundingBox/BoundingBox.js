import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { multiply } from 'react-native-reanimated';
import DragHandler from '../DragHandler/DragHandler';
import BoundingBoxProperties from '../../constants/BoundingBoxProperties';
import styles from './BoundingBoxStyles';

const { centerPaddingPercentage } = BoundingBoxProperties;

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
  function buildTopGestureEvent(offsetX, offsetY, transY, top) {
    return event([
      {
        nativeEvent: ({ translationY: y, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transY, add(transY, sub(offsetY, y))),
              set(top, add(top, sub(y, offsetY))),
              set(offsetY, y),
            ]),

            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
          ]),
      },
    ]);
  }

  function buildRightGestureEvent(offsetX, offsetY, transX) {
    return event([
      {
        nativeEvent: ({ translationX: x, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transX, add(transX, sub(x, offsetX))),
              set(offsetX, x),
            ]),
            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
          ]),
      },
    ]);
  }

  function buildBottomGestureEvent(offsetX, offsetY, transY) {
    return event([
      {
        nativeEvent: ({ translationY: y, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transY, add(transY, sub(y, offsetY))),
              set(offsetY, y),
            ]),
            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
          ]),
      },
    ]);
  }

  function buildLeftGestureEvent(offsetX, offsetY, transX, left) {
    return event([
      {
        nativeEvent: ({ translationX: x, state }) =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(transX, add(transX, sub(offsetX, x))),
              set(left, add(left, sub(x, offsetX))),
              set(offsetX, x),
            ]),

            cond(eq(state, State.END), [set(offsetX, 0), set(offsetY, 0)]),
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

  const offsetTopWidth = useRef(new Value(0)).current;
  const offsetTopHeight = useRef(new Value(0)).current;

  const offsetRightWidth = useRef(new Value(0)).current;
  const offsetRightHeight = useRef(new Value(0)).current;

  const offsetBottomWidth = useRef(new Value(0)).current;
  const offsetBottomHeight = useRef(new Value(0)).current;

  const offsetLeftWidth = useRef(new Value(0)).current;
  const offsetLeftHeight = useRef(new Value(0)).current;

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

  const handleTopDrag = buildTopGestureEvent(
    offsetTopWidth,
    offsetTopHeight,
    transHeight,
    absoluteY,
  );
  const handleRightDrag = buildRightGestureEvent(
    offsetRightWidth,
    offsetRightHeight,
    transWidth,
  );
  const handleBottomDrag = buildBottomGestureEvent(
    offsetBottomWidth,
    offsetBottomHeight,
    transHeight,
  );
  const handleLeftDrag = buildLeftGestureEvent(
    offsetLeftWidth,
    offsetLeftHeight,
    transWidth,
    absoluteX,
  );
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

  const paddingPercentage = useRef(new Value(centerPaddingPercentage)).current;
  const centerWidthPadding = multiply(transWidth, paddingPercentage);
  const centerHeightPadding = multiply(transHeight, paddingPercentage);
  const centerWidth = sub(transWidth, centerWidthPadding);
  const centerHeight = sub(transHeight, centerHeightPadding);

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
      <DragHandler
        transWidth={transWidth}
        transHeight={transHeight}
        onGestureEvent={handleTopDrag}
        position="top"
      />
      <DragHandler
        transWidth={transWidth}
        transHeight={transHeight}
        onGestureEvent={handleBottomDrag}
        position="bottom"
      />
      <DragHandler
        transWidth={transWidth}
        transHeight={transHeight}
        onGestureEvent={handleRightDrag}
        position="right"
      />
      <DragHandler
        transWidth={transWidth}
        transHeight={transHeight}
        onGestureEvent={handleLeftDrag}
        position="left"
      />
      <DragHandler onGestureEvent={handleTopLeftDrag} position="topLeft" />
      <DragHandler onGestureEvent={handleTopRightDrag} position="topRight" />
      <DragHandler
        onGestureEvent={handleBottomRightDrag}
        position="bottomRight"
      />
      <DragHandler
        onGestureEvent={handleBottomLeftDrag}
        position="bottomLeft"
      />
    </Animated.View>
  );
};

export default BoundingBox;
