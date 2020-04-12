import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    zIndex: 2,
  },
  topText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 28,
    position: 'absolute',
    zIndex: 1,
  },
});

export default styles;
