import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  camera: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  container: {
    flex: 1,
    position: 'relative',
  },

  notBlurred: {
    ...StyleSheet.absoluteFill,
  },
  textContainer: {
    alignItems: 'center',
    borderColor: Colors.red,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-around',
    position: 'absolute',
  },
});

export default styles;
