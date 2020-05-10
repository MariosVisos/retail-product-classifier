import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    // padding: 20,
  },
  fab: {
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
});

export default styles;
