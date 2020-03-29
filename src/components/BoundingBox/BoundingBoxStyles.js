import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const opacity = 'rgba(0, 0, 0, .6)';

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
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
});

export default styles;
