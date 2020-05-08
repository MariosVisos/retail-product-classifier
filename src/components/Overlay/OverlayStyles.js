import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: Colors.primary,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    position: 'absolute',
    width: '100%',
  },
  headerContainer: { backgroundColor: Colors.secondary, padding: 10 },
  headerTitle: { color: Colors.primary, fontSize: 20 },
  overlayStyle: { backgroundColor: Colors.primary, padding: 0 },
});
export default styles;
