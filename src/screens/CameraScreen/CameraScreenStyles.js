import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  camera: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  cameraButton: {
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  instructionContainer: {
    backgroundColor: Colors.getColorOpacity(Colors.black, 0.4),
    paddingBottom: 2,
    paddingHorizontal: 10,
    position: 'absolute',
    textAlign: 'center',
    top: 34,
    width: '100%',
  },
  instructionText: { color: Colors.primary, fontSize: 18 },
  nextButton: {
    bottom: 68,
    position: 'absolute',
    right: 8,
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
