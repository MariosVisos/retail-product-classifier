import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  textStyle: { color: Colors.secondary, fontSize: 20, marginVertical: 8 },
});
export default styles;
