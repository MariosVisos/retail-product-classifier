import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const opacity = 'rgba(0, 0, 0, .6)';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const overlayBaseStyle = {
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.6)',
};
const cornerBaseStyle = {
  position: 'absolute',
  borderColor: '#fff',
  backgroundColor: 'transparent',
  borderWidth: 2,
  width: 10,
  height: 10,
};

const edgeBaseStyle = {
  position: 'absolute',
  borderColor: '#fff',
  backgroundColor: 'transparent',
  borderWidth: 2,
  height: 0,
};

const styles = StyleSheet.create({
  bottomEdge: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    height: 0,
    width: 20,
  },
  bottomLeftCorner: {
    ...cornerBaseStyle,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomOverlay: {
    ...overlayBaseStyle,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomRightCorner: {
    ...cornerBaseStyle,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  edgeDragContainer: {
    ...edgeBaseStyle,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    right: screenWidth / 2 - 50,
    width: 100,
  },
  leftOverlay: {
    ...overlayBaseStyle,
    left: 0,
  },
  rightOverlay: {
    ...overlayBaseStyle,
    right: 0,
  },
  topLeftCorner: {
    ...cornerBaseStyle,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topOverlay: {
    ...overlayBaseStyle,
    left: 0,
    right: 0,
    top: 0,
  },
  topRightCorner: {
    ...cornerBaseStyle,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
});

export default styles;
