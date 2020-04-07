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
  borderColor: Colors.dragHandlerColor,
  borderWidth: 1,
  height: dragAreaEdge,
  justifyContent: 'center',
  position: 'absolute',
  width: dragAreaEdge,
};
const edgeSize = dragAreaEdge;

const edgeContainerBaseStyle = {
  ...containerBaseStyle,
  // position: 'relative',
};

const edgeBaseStyle = {
  backgroundColor: Colors.transparent,
  borderColor: Colors.dragHandlerColor,
  borderWidth: 1,
};

const styles = StyleSheet.create({
  bottom: { ...edgeBaseStyle },
  bottomContainer: { ...edgeContainerBaseStyle, width: edgeSize },
  bottomLeft: {
    ...cornerBaseStyle,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomLeftContainer: {
    ...containerBaseStyle,
    bottom: 3 - dragAreaEdge / 2,
    left: 3 - dragAreaEdge / 2,
  },
  bottomRight: {
    ...cornerBaseStyle,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomRightContainer: {
    ...containerBaseStyle,
    bottom: 3 - dragAreaEdge / 2,
    right: 3 - dragAreaEdge / 2,
  },
  left: { ...edgeBaseStyle },
  leftContainer: { ...edgeContainerBaseStyle },
  right: { ...edgeBaseStyle },
  rightContainer: { ...edgeContainerBaseStyle },
  top: { ...edgeBaseStyle },
  topContainer: { ...edgeContainerBaseStyle },
  topLeft: {
    ...cornerBaseStyle,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topLeftContainer: {
    ...containerBaseStyle,
    left: 3 - dragAreaEdge / 2,
    top: 3 - dragAreaEdge / 2,
  },
  topRight: {
    ...cornerBaseStyle,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  topRightContainer: {
    ...containerBaseStyle,
    right: 3 - dragAreaEdge / 2,
    top: 3 - dragAreaEdge / 2,
  },
});

export default styles;
