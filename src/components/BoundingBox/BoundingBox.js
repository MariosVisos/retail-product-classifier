import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import EdgeDragHandler from '../EdgeDragHandler/EdgeDragHandler';
import styles from './BoundingBoxStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BoundingBox = () => {
  const boxX = 200;
  const boxY = 200;

  const initialBoundingBox = {
    x: boxX,
    y: boxY,
  };
  const boxTopX = screenWidth;
  const boxTopY = (screenHeight - boxY) / 2;

  const boxBottomX = screenWidth;
  const boxBottomY = (screenHeight - boxY) / 2;

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

  function onHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.oldState === State.ACTIVE) {
      setTranslationY(0);
    }
  }

  function onGestureEvent({ nativeEvent }) {
    setTranslationX(nativeEvent.translationX);
    setTranslationY(nativeEvent.translationY);
  }

  function onBottomHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.oldState === State.ACTIVE) {
      setTranslationBottomY(0);
    }
  }

  function onBottomGestureEvent({ nativeEvent }) {
    // setTranslationX(nativeEvent.translationX);
    setTranslationBottomY(nativeEvent.translationY);
  }
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
    <View
      key="topOverlay"
      style={{ ...styles.topOverlay, bottom: boxBottomY + boxY }}
    />,
    <View
      key="leftOverlay"
      style={{
        ...styles.leftOverlay,
        bottom: boxBottomY - translationTopY - translationBottomY,
        top: boxTopY,
        right: boxRightX + boxX,
      }}
    />,
    <View
      key="rightOverlay"
      style={{
        ...styles.rightOverlay,
        bottom: boxBottomY - translationTopY - translationBottomY,
        top: boxTopY,
        left: boxX + boxLeftX,
      }}
    />,
    <View
      key="bottomOverlay"
      style={{
        ...styles.bottomOverlay,
        top: boxTopY + boxY + translationTopY - translationBottomY,
      }}
    />,
    <View
      key="topLeftCorner"
      style={{ ...styles.topLeftCorner, left: boxLeftX - 1, top: boxTopY - 1 }}
    />,
    <EdgeDragHandler
      key="topEdge"
      position="top"
      boundingBox={boundingBox}
      boxTop={boxTop}
      boxRight={boxRight}
      onGestureEvent={onTopGestureEvent}
      onHandlerStateChange={onTopHandlerStateChange}
    />,
    <EdgeDragHandler
      key="leftEdge"
      position="left"
      boundingBox={boundingBox}
      boxTop={boxTop}
      boxRight={boxRight}
      translationY={translationTopY + translationBottomY}
    />,
    <View
      key="topRightCorner"
      style={{ ...styles.topRightCorner, top: boxTopY, right: boxRightX - 1 }}
    />,
    <EdgeDragHandler
      key="rightEdge"
      position="right"
      boundingBox={boundingBox}
      boxTop={boxTop}
      boxRight={boxRight}
      translationY={translationTopY + translationBottomY}
    />,
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
      onGestureEvent={onBottomGestureEvent}
      onHandlerStateChange={onBottomHandlerStateChange}
      translationY={translationTopY + translationBottomY}
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
