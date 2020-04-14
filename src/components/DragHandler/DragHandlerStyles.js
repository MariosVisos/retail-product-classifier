import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import BoundingBoxProperties from '../../constants/BoundingBoxProperties';

const {
  borderColor,
  borderWidth,
  cornerArea,
  cornerDragArea,
} = BoundingBoxProperties.corner;

const dragAreaEdge = Math.sqrt(cornerDragArea);
const cornerAreaEdge = Math.sqrt(cornerArea);

const cornerBaseStyle = {
  borderColor,
  borderWidth,
  width: cornerAreaEdge,
  height: cornerAreaEdge,
};

const containerBaseStyle = {
  alignItems: 'center',
  borderColor: Colors.primary,
  // borderWidth: 1,
  height: dragAreaEdge,
  justifyContent: 'center',
  position: 'absolute',
  width: dragAreaEdge,
};
const edgeSize = dragAreaEdge + 5;

const edgeContainerBaseStyle = {
  ...containerBaseStyle,
  height: edgeSize,
  width: edgeSize,
};

const edgeBaseStyle = {
  backgroundColor: Colors.transparent,
  borderColor: Colors.primary,
  borderWidth: 1,
  width: 20,
};

const styles = StyleSheet.create({
  bottom: { ...edgeBaseStyle },
  bottomContainer: {
    ...edgeContainerBaseStyle,
    bottom: -2.6 - dragAreaEdge / 2,
  },
  bottomLeft: {
    ...cornerBaseStyle,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomLeftContainer: {
    ...containerBaseStyle,
    bottom: 2 + borderWidth - dragAreaEdge / 2,
    left: 2 + borderWidth - dragAreaEdge / 2,
  },
  bottomRight: {
    ...cornerBaseStyle,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomRightContainer: {
    ...containerBaseStyle,
    bottom: 2 + borderWidth - dragAreaEdge / 2,
    right: 2 + borderWidth - dragAreaEdge / 2,
  },
  left: { ...edgeBaseStyle, height: 20, width: 0 },
  leftContainer: {
    ...edgeContainerBaseStyle,
    left: -2.6 - dragAreaEdge / 2,
  },
  right: { ...edgeBaseStyle, height: 20, width: 0 },
  rightContainer: { ...edgeContainerBaseStyle, right: -2.6 - dragAreaEdge / 2 },
  top: { ...edgeBaseStyle },
  topContainer: { ...edgeContainerBaseStyle, top: -2.6 - dragAreaEdge / 2 },
  topLeft: {
    ...cornerBaseStyle,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topLeftContainer: {
    ...containerBaseStyle,
    left: 2 + borderWidth - dragAreaEdge / 2,
    top: 2 + borderWidth - dragAreaEdge / 2,
  },
  topRight: {
    ...cornerBaseStyle,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  topRightContainer: {
    ...containerBaseStyle,
    right: 2 + borderWidth - dragAreaEdge / 2,
    top: 2 + borderWidth - dragAreaEdge / 2,
  },
});

export default styles;
