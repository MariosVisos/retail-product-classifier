import React, { useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import EdgeDragHandler from '../EdgeDragHandler/EdgeDragHandler';
import styles from './BoundingBoxStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BoundingBox = () => {
  const boxX = 200;
  const boxY = 200;

  const {
    cond,
    eq,
    add,
    set,
    Value,
    event,
    interpolate,
    Extrapolate,
  } = Animated;

  const transX = useRef(new Value(0)).current;
  const offsetX = useRef(new Value(boxX)).current;
  const transY = useRef(new Value(0)).current;
  const offsetY = useRef(new Value(boxY)).current;

  const initialBoundingBox = {
    x: boxX,
    y: boxY,
  };
  const boxTopX = screenWidth;
  const boxTopY = (screenHeight - boxY) / 2;
  const transBoxTopX = useRef(new Value(0)).current;
  const offsetBoxTopX = useRef(new Value(boxTopX)).current;
  const transBoxTopY = useRef(new Value(0)).current;
  const offsetBoxTopY = useRef(new Value(boxTopY)).current;

  const boxBottomX = screenWidth;

  const boxBottomY = (screenHeight - boxY) / 2;
  const dragBoxBottomX = useRef(new Value(0)).current;
  const dragBoxBottomY = useRef(new Value(0)).current;
  const offsetBoxBottomX = useRef(new Value(boxBottomX)).current;
  const offsetBoxBottomY = useRef(new Value(boxBottomY)).current;
  const boxBottomYGestureState = useRef(new Value(-1)).current;

  const boxBottomTop = boxTopY + boxY - 20;
  const dragBoxBottomTop = useRef(new Value(0)).current;
  const offsetBoxBottomTop = useRef(new Value(boxBottomTop)).current;
  const boxBottomTopGestureState = useRef(new Value(-1)).current;

  const transBoxBottomY = cond(
    eq(boxBottomTopGestureState, State.ACTIVE),
    add(offsetBoxBottomY, dragBoxBottomTop),
    set(offsetBoxBottomY, add(offsetBoxBottomY, dragBoxBottomTop)),
  );
  const transBoxBottomTop = cond(
    eq(boxBottomTopGestureState, State.ACTIVE),
    add(offsetBoxBottomTop, dragBoxBottomTop),
    set(offsetBoxBottomTop, add(offsetBoxBottomTop, dragBoxBottomTop)),
  );

  const boxLeftX = (screenWidth - boxX) / 2;
  const boxLeftY = (screenHeight - boxY) / 2;

  const boxRightX = (screenWidth - boxX) / 2;
  const boxRightY = (screenHeight - boxY) / 2;
  const initialBoxTop = {
    x: boxTopX,
    y: boxTopY,
  };

  const initialBoxRight = {
    x: boxRightX,
    y: boxRightY,
  };
  const initialBoxBottom = {
    x: boxBottomX,
    y: boxBottomY,
  };
  const initialBoxLeft = {
    x: boxLeftX,
    y: boxLeftY,
  };

  const [boundingBox, setBoundingBox] = useState(initialBoundingBox);
  const [boxTop, setBoxTop] = useState(initialBoxTop);
  const [boxRight, setBoxRight] = useState(initialBoxRight);
  const [boxBottom, setBoxBottom] = useState(initialBoxBottom);
  const [boxLeft, setBoxLeft] = useState(initialBoxLeft);
  // const [translationX, setTranslationX] = useState(0);
  const [translationTopY, setTranslationTopY] = useState(0);
  const [translationRightY, setTranslationRightY] = useState(0);
  const [translationBottomY, setTranslationBottomY] = useState(0);
  const [translationLeftY, setTranslationLeftY] = useState(0);
  const [lastOffsetX, setlastOffsetX] = useState(0);
  const [lastOffsetY, setlastOffsetY] = useState(0);

  const initY = boxTop.y + boundingBox.y - 20;
  console.log('BoundingBox -> initY', initY);
  // const transX = useRef(new Animated.Value(0)).current;
  // const transY = useRef(new Animated.Value(0)).current;
  const initTop = boxTopY + boxY;
  const bottomOverlayTop = useRef(new Animated.Value(initTop)).current;
  console.log('BoundingBox -> transY', transY);
  // function onHandlerStateChange({ nativeEvent }) {
  //   if (nativeEvent.oldState === State.ACTIVE) {
  //     setTranslationY(0);
  //   }
  // }

  // function onGestureEvent({ nativeEvent }) {
  //   setTranslationX(nativeEvent.translationX);
  //   setTranslationY(nativeEvent.translationY);
  // }
  const onBottomGestureEvent = event(
    [
      {
        nativeEvent: {
          translationX: dragBoxBottomX,
          translationY: dragBoxBottomY,
          state: boxBottomYGestureState,
        },
      },
    ],
    { useNativeDriver: true },
  );
  const onBottomTopGestureEvent = event(
    [
      {
        nativeEvent: {
          translationY: dragBoxBottomTop,
          state: boxBottomTopGestureState,
        },
      },
    ],
    { useNativeDriver: true },
  );

  const onBottomHandlerStateChange = (event) => {
    // if (event.nativeEvent.oldState === State.ACTIVE) {
    //   lastOffset.x += event.nativeEvent.translationX;
    //   lastOffset.y += event.nativeEvent.translationY;
    //   transX.setOffset(lastOffset.x);
    //   transX.setValue(0);
    //   transY.setOffset(lastOffset.y);
    //   transY.setValue(0);
    // }
  };
  // function onBottomHandlerStateChange({ nativeEvent }) {
  //   if (nativeEvent.oldState === State.ACTIVE) {
  //     setTranslationBottomY(0);
  //   }
  // }

  // function onBottomGestureEvent({ nativeEvent }) {
  //   // setTranslationX(nativeEvent.translationX);
  //   setTranslationBottomY(nativeEvent.translationY);
  // }

  function onLeftHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.oldState === State.ACTIVE) {
      setTranslationLeftY(0);
    }
  }

  function onLeftGestureEvent({ nativeEvent }) {
    // setTranslationX(nativeEvent.translationX);
    setTranslationLeftY(nativeEvent.translationY);
  }
  function onTopHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.oldState === State.ACTIVE) {
      setTranslationTopY(0);
    }
  }

  function onTopGestureEvent({ nativeEvent }) {
    // setTranslationX(nativeEvent.translationX);
    setTranslationTopY(nativeEvent.translationY);
  }
  function onRightHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.oldState === State.ACTIVE) {
      setTranslationRightY(0);
    }
  }

  function onRightGestureEvent({ nativeEvent }) {
    // setTranslationX(nativeEvent.translationX);
    setTranslationRightY(nativeEvent.translationY);
  }

  return [
    // <View
    //   key="topOverlay"
    //   style={{ ...styles.topOverlay, bottom: boxBottomY + boxY }}
    // />,
    // <View
    //   key="leftOverlay"
    //   style={{
    //     ...styles.leftOverlay,
    //     bottom: boxBottomY - translationTopY - translationBottomY,
    //     top: boxTopY,
    //     right: boxRightX + boxX,
    //   }}
    // />,
    // <View
    //   key="rightOverlay"
    //   style={{
    //     ...styles.rightOverlay,
    //     bottom: boxBottomY - translationTopY - translationBottomY,
    //     top: boxTopY,
    //     left: boxX + boxLeftX,
    //   }}
    // />,
    // <Animated.View
    //   key="bottomOverlay"
    //   style={{
    //     ...styles.bottomOverlay,
    //     top: 0,
    //     transform: [{ translateY: transBoxBottomY }],
    //   }}
    // />,
    <View
      key="topLeftCorner"
      style={{ ...styles.topLeftCorner, left: boxLeftX - 1, top: boxTopY - 1 }}
    />,
    // <EdgeDragHandler
    //   key="topEdge"
    //   position="top"
    //   boundingBox={boundingBox}
    //   boxTop={boxTop}
    //   boxRight={boxRight}
    //   onGestureEvent={onTopGestureEvent}
    //   onHandlerStateChange={onTopHandlerStateChange}
    // />,
    // <EdgeDragHandler
    //   key="leftEdge"
    //   position="left"
    //   boundingBox={boundingBox}
    //   boxTop={boxTop}
    //   boxRight={boxRight}
    //   translationY={translationTopY + translationBottomY}
    // />,
    <View
      key="topRightCorner"
      style={{ ...styles.topRightCorner, top: boxTopY, right: boxRightX - 1 }}
    />,
    // <EdgeDragHandler
    //   key="rightEdge"
    //   position="right"
    //   boundingBox={boundingBox}
    //   boxTop={boxTop}
    //   boxRight={boxRight}
    //   translationY={translationTopY + translationBottomY}
    // />,
    <View
      key="bottomLeftCorner"
      style={{
        ...styles.bottomLeftCorner,
        bottom: boxBottomY - 1 - translationTopY - translationBottomY,
        left: boxLeftX - 1,
      }}
    />,
    <EdgeDragHandler
      key="bottomEdge"
      position="bottom"
      boundingBox={boundingBox}
      boxTop={boxTop}
      boxRight={boxRight}
      onGestureEvent={onBottomTopGestureEvent}
      onHandlerStateChange={onBottomHandlerStateChange}
      translationY={translationTopY + translationBottomY}
      transX={transX}
      transY={transBoxBottomTop}
    />,
    <View
      key="bottomRightCorner"
      style={{
        ...styles.bottomRightCorner,
        bottom: boxBottomY - 1 - translationTopY - translationBottomY,
        right: boxRightX - 1,
      }}
    />,
  ];
};

export default BoundingBox;
