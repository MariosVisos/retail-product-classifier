import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  footerContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: '100%',
  },
  headerContainer: { backgroundColor: Colors.secondary, padding: 10 },
  headerTitle: { color: Colors.primary, fontSize: 20 },
  overlayStyle: {
    backgroundColor: Colors.primary,
    padding: 0,
    width: '80%',
  },
});
export default styles;
