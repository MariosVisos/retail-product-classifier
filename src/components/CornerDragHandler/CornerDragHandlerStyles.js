import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const dragAreaEdge = 80;

const cornerBaseStyle = {
  borderColor: '#fff',
  borderWidth: 2,
  width: 10,
  height: 10,
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

const styles = StyleSheet.create({
  bottomLeft: {
    ...cornerBaseStyle,
    borderRightWidth: 0,
    borderTopWidth: 0,
    // bottom: 0,
    // left: 0,
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
