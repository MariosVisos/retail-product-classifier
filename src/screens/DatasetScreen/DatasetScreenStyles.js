import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.primary, flex: 1 },
  manuallyAddButton: {
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
  scanToAddButton: { bottom: 60, position: 'absolute', right: 10 },
  trainButton: { bottom: 110, position: 'absolute', right: 10 },
});

export default styles;
