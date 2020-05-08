import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'space-around',
  },
  fab: {
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
});

export default styles;
