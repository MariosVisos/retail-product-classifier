import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

// const edgeBaseStyle = {
//   position: 'absolute',
//   borderColor: '#fff',
//   backgroundColor: 'transparent',
//   borderWidth: 2,
//   height: 0,
// };

const styles = StyleSheet.create({
  center: {
    borderColor: Colors.red,
    borderWidth: 2,
    height: 50,
    width: 50,
  },
  container: {
    alignItems: 'center',
    borderColor: Colors.red,
    borderWidth: 2,
    height: 200,
    justifyContent: 'center',
    position: 'absolute',
    width: 200,
  },
});

export default styles;
