import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  cancelButtonContainer: { bottom: 20, position: 'absolute' },
  imageStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: '100%',
    width: '100%',
  },
  overlayStyle: { backgroundColor: Colors.primary, padding: 0 },
});

export default styles;
