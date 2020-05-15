import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  layout: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  topText: {
    alignSelf: 'center',
    color: Colors.primary,
    fontSize: 28,
    position: 'absolute',
    zIndex: 1,
  },
});

export default styles;
