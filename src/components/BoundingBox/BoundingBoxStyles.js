import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import BoundingBoxProperties from '../../constants/BoundingBoxProperties';

const {
  backgroundColor,
  borderColor,
  borderStyle,
  borderWidth,
} = BoundingBoxProperties;

const styles = StyleSheet.create({
  center: {
    borderColor: Colors.red,
    borderWidth: 2,
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor,
    borderColor,
    borderRadius: 1,
    borderStyle,
    borderWidth,
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default styles;
