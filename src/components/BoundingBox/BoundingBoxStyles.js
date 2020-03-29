import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const opacity = 'rgba(0, 0, 0, .6)';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BOX_MARGIN = 40;
const BOX_SIZE = screenWidth - BOX_MARGIN * 2;
const BOX_TOP = screenHeight / 2 - BOX_SIZE / 2;
const BOX_BOTTOM = BOX_TOP + BOX_SIZE;
const BOX_LEFT = BOX_MARGIN;
const BOX_RIGHT = screenWidth - BOX_LEFT;

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

const styles = StyleSheet.create({
  container: { flex: 1 },
  focused: {
    borderColor: Colors.red,
    borderWidth: 0.2,
  },
  layerBottom: {
    backgroundColor: opacity,
    flex: 2,
  },
  layerCenter: {
    flexDirection: 'row',
  },
  layerLeft: {
    backgroundColor: opacity,
    flex: 1,
  },
  layerRight: {
    backgroundColor: opacity,
    flex: 1,
  },
  layerTop: {
    backgroundColor: opacity,
    flex: 2,
  },
  topLeftCorner: {
    ...cornerBaseStyle,
    top: BOX_TOP - 1,
    left: BOX_MARGIN - 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRightCorner: {
    ...cornerBaseStyle,
    top: BOX_TOP - 1,
    right: BOX_MARGIN - 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeftCorner: {
    ...cornerBaseStyle,
    bottom: screenHeight - BOX_BOTTOM - 1,
    left: BOX_MARGIN - 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRightCorner: {
    ...cornerBaseStyle,
    bottom: screenHeight - BOX_BOTTOM - 1,
    right: BOX_MARGIN - 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  topOverlay: {
    ...overlayBaseStyle,
    top: 0,
    left: 0,
    right: 0,
    bottom: screenHeight - BOX_TOP,
  },
  leftOverlay: {
    ...overlayBaseStyle,
    top: BOX_TOP,
    left: 0,
    right: BOX_RIGHT,
    bottom: screenHeight - BOX_BOTTOM,
  },
  rightOverlay: {
    ...overlayBaseStyle,
    top: BOX_TOP,
    left: BOX_RIGHT,
    right: 0,
    bottom: screenHeight - BOX_BOTTOM,
  },
  bottomOverlay: {
    ...overlayBaseStyle,
    top: BOX_BOTTOM,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
