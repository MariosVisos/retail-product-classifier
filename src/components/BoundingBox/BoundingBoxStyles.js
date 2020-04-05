import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const opacity = 'rgba(0, 0, 0, .6)';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const overlayBaseStyle = {
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.6)',
};

const edgeBaseStyle = {
  position: 'absolute',
  borderColor: '#fff',
  backgroundColor: 'transparent',
  borderWidth: 2,
  height: 0,
};

const styles = StyleSheet.create({
  center: {
    borderColor: Colors.red,
    borderWidth: 2,
    height: 50,
    width: 50,
  },
  container: {
    alignItems: 'center',
    // backgroundColor: 'yellow',
    borderColor: Colors.red,
    borderWidth: 2,
    height: 200,
    justifyContent: 'center',
    position: 'relative',
    width: 200,
  },
});

export default styles;
