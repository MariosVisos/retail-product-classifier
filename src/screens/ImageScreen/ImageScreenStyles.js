import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageWidth = windowWidth * 0.88;
const imageHeight = windowHeight * 0.4;

const styles = StyleSheet.create({
  cancelButtonContainer: {
    alignSelf: 'center',
    bottom: 20,
    position: 'absolute',
  },
  cardStyle: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    padding: 2,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    flex: 1,
    padding: 8,
  },
  dividerStyle: { margin: 0 },
  imageStyle: {
    borderRadius: 8,
    height: imageHeight,
    width: imageWidth,
  },
  maximizeIcon: { bottom: 0, position: 'absolute', right: 0 },
  overlayContainer: { padding: 0 },
  overlayImage: { height: windowHeight * 0.8, width: windowWidth * 0.8 },
  propertiesContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  propertyKeysContainer: { marginRight: 20 },
  propertyText: { color: Colors.black },
  valueText: { color: Colors.black, flex: 1, fontWeight: 'bold' },
  valueTextContainer: { flexDirection: 'row' },
  valuesContainer: { width: '50%' },
});

export default styles;
