import React, { useRef, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { multiply, lessThan, and, or } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import DragHandler from '../DragHandler/DragHandler';
import BoundingBoxProperties from '../../constants/BoundingBoxProperties';
import styles from './BoundingBoxStyles';
import { uploadImage } from '../../store/actions/entity';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

const { centerPaddingPercentage, minWidth, minHeight } = BoundingBoxProperties;
const {
  cond,
  eq,
  add,
  set,
  Value,
  event,
  block,
  sub,
  useCode,
  call,
} = Animated;
const BoundingBox = ({
  initialBoxWidth,
  initialBoxHeight,
  photo,
  setPhoto,
  insets,
}) => {
  const verticalInset = insets.top + insets.bottom;
  let cameraScreenHeight = windowHeight - verticalInset;
  const cameraScreenWidth = windowWidth;
  const hasNotch = insets.top > 24;
  if (hasNotch && screenHeight > windowHeight) {
    cameraScreenHeight = screenHeight - verticalInset;
  }

  const scannedLabel = useSelector(state => state.entity.scannedLabel);
  const dispatch = useDispatch();

  const boxX = initialBoxWidth;
  const boxY = initialBoxHeight;

  const minimumWidth = useRef(new Value(minWidth)).current;
  const minimumHeight = useRef(new Value(minHeight)).current;

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
            cond(
              or(
                and(eq(state, State.ACTIVE), lessThan(minimumHeight, transY)),
                and(eq(state, State.ACTIVE), lessThan(y, 0)),
              ),
              [
                set(transY, add(transY, sub(offsetY, y))),
                set(top, add(top, sub(y, offsetY))),
                set(offsetY, y),
              ],
            ),

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
            cond(
              or(
                and(eq(state, State.ACTIVE), lessThan(minimumWidth, transX)),
                and(eq(state, State.ACTIVE), lessThan(0, x)),
              ),
              [set(transX, add(transX, sub(x, offsetX))), set(offsetX, x)],
            ),
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
            cond(
              or(
                and(eq(state, State.ACTIVE), lessThan(minimumHeight, transY)),
                and(eq(state, State.ACTIVE), lessThan(0, y)),
              ),
              [set(transY, add(transY, sub(y, offsetY))), set(offsetY, y)],
              [set(transY, add(transY, 0.1))],
            ),
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
            cond(
              or(
                and(eq(state, State.ACTIVE), lessThan(minimumWidth, transX)),
                and(eq(state, State.ACTIVE), lessThan(x, 0)),
              ),
              [
                set(transX, add(transX, sub(offsetX, x))),
                set(left, add(left, sub(x, offsetX))),
                set(offsetX, x),
              ],
            ),

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
            cond(
              and(
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumHeight, transY)),
                  and(eq(state, State.ACTIVE), lessThan(y, 0)),
                ),
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumWidth, transX)),
                  and(eq(state, State.ACTIVE), lessThan(x, 0)),
                ),
              ),
              [
                set(transX, add(transX, sub(offsetX, x))),
                set(transY, add(transY, sub(offsetY, y))),
                set(top, add(top, sub(y, offsetY))),
                set(left, add(left, sub(x, offsetX))),
                set(offsetX, x),
                set(offsetY, y),
              ],
            ),

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
            cond(
              and(
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumHeight, transY)),
                  and(eq(state, State.ACTIVE), lessThan(y, 0)),
                ),
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumWidth, transX)),
                  and(eq(state, State.ACTIVE), lessThan(0, x)),
                ),
              ),
              [
                set(transX, add(transX, sub(x, offsetX))),
                set(transY, add(transY, sub(offsetY, y))),
                set(top, add(top, sub(y, offsetY))),
                set(offsetX, x),
                set(offsetY, y),
              ],
            ),

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
            cond(
              and(
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumHeight, transY)),
                  and(eq(state, State.ACTIVE), lessThan(0, y)),
                ),
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumWidth, transX)),
                  and(eq(state, State.ACTIVE), lessThan(0, x)),
                ),
              ),
              [
                set(transX, add(transX, sub(x, offsetX))),
                set(transY, add(transY, sub(y, offsetY))),
                set(offsetX, x),
                set(offsetY, y),
              ],
            ),
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
            cond(
              and(
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumHeight, transY)),
                  and(eq(state, State.ACTIVE), lessThan(0, y)),
                ),
                or(
                  and(eq(state, State.ACTIVE), lessThan(minimumWidth, transX)),
                  and(eq(state, State.ACTIVE), lessThan(x, 0)),
                ),
              ),

              [
                set(transX, add(transX, sub(offsetX, x))),
                set(transY, add(transY, sub(y, offsetY))),
                set(left, add(left, sub(x, offsetX))),
                set(offsetX, x),
                set(offsetY, y),
              ],
            ),
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

  const absoluteY = useRef(new Value((cameraScreenHeight - boxY) / 2)).current;
  const absoluteX = useRef(new Value((cameraScreenWidth - boxX) / 2)).current;

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

  useCode(
    () =>
      photo && [
        call(
          [absoluteX, absoluteY, transX, transY, transWidth, transHeight],
          ([valX, valY, tranX, tranY, width, height]) => {
            const absX = valX + tranX;
            const absY = valY + tranY;
            const boundingBox = {
              topLeft: {
                x: (photo.width * absX) / cameraScreenWidth,
                y: (photo.height * absY) / cameraScreenHeight,
              },
              bottomRight: {
                x: (photo.width * (absX + width)) / cameraScreenWidth,
                y: (photo.height * (absY + height)) / cameraScreenHeight,
              },
              width: (photo.width * width) / cameraScreenWidth,
              height: (photo.height * height) / cameraScreenHeight,
            };
            // console.log('boundingBox', boundingBox);

            // console.log('BoundingBox -> height', height);
            // console.log('BoundingBox -> width', width);
            // console.log('BoundingBox -> absoluteX -> valX', valX);
            // console.log('BoundingBox -> absoluteX -> tranX', tranX);
            // console.log('BoundingBox -> absoluteY -> valY', valY);
            // console.log('BoundingBox -> absoluteY -> tranY', tranY);

            // console.log('screenWidth', cameraScreenWidth);
            // console.log('screenHeight', cameraScreenHeight);

            // dispatch(uploadImage(photo, scannedLabel, boundingBox));
            console.log('scannedLabel', scannedLabel);
            console.log('boundingBox', boundingBox);
            console.log('photo', photo);
            // console.log('scannedLabelName', scannedLabelName);

            // console.log('x', valX + tranX);
            // console.log('y', valY + tranY);
            // console.log('photo', photo);

            setPhoto(null);
          },
        ),
      ],
    [photo],
  );

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
