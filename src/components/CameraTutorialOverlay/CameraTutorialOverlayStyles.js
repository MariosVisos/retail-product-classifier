import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  cancelButtonContainer: { bottom: 8, position: 'absolute' },
  checkBoxContainer: { bottom: 68, position: 'absolute' },
  imageStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: '100%',
    width: '100%',
  },
  overlayStyle: { backgroundColor: Colors.primary, padding: 0 },
  statusBarCover: {
    backgroundColor: Colors.secondaryDark,
    height: 24,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default styles;
