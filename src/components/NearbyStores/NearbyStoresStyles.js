import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const baseStoreContainer = {
  alignItems: 'center',
  borderRadius: 6,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 20,
  padding: 8,
};

const baseStoreTitle = {
  color: Colors.secondary,
  fontSize: 22,
  width: 200,
};

const baseImage = {
  height: 80,
  width: 80,
};
const styles = StyleSheet.create({
  chooseStoreText: { fontSize: 16, marginBottom: 28 },
  confirmButton: { color: Colors.black, marginVertical: 12 },
  confirmText: { fontSize: 16 },
  container: {
    backgroundColor: Colors.primary,
    padding: 8,
  },
  imageStyle: {
    ...baseImage,
  },
  noImage: {
    ...baseImage,
    backgroundColor: Colors.grayLight,
  },
  noImageText: { color: Colors.black, position: 'absolute', right: 20 },
  questionText: { color: Colors.grayDark, fontSize: 22, fontWeight: 'bold' },
  selectedImageStyle: {
    ...baseImage,
  },
  selectedStoreContainer: {
    ...baseStoreContainer,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  selectedStoreTitleText: {
    ...baseStoreTitle,
    color: Colors.accent,
  },
  storeContainer: {
    ...baseStoreContainer,
    borderColor: Colors.secondary,
    borderWidth: 0.4,
    marginVertical: 8,
  },
  storeTitleText: { ...baseStoreTitle },
});

export default styles;
