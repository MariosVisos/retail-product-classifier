import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    // borderColor: Colors.dragHandlerColor,
    // borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
  },
  edge: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.dragHandlerColor,
    borderWidth: 1,
    height: 0,
    width: 20,
  },
});

export default styles;
