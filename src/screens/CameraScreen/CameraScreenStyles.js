import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  camera: {
    // height: screenHeight,
    position: 'relative',
    // width: screenWidth,
    // zIndex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    // width: '100%',
  },

  notBlurred: {
    ...StyleSheet.absoluteFill,
  },
  textContainer: {
    alignItems: 'center',
    borderColor: Colors.red,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-around',
    position: 'absolute',
  },
});

export default styles;
