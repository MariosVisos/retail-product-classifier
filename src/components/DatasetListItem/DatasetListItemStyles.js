import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    height: '100%',
    padding: 8,
  },
  classifyButtonStyle: { backgroundColor: Colors.secondary },
  container: {
    borderColor: Colors.secondary,
    borderRadius: 8,
    borderWidth: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 6,
  },
  labelSubtitleText: { color: Colors.grayDark },
  leftContainer: { padding: 8 },
  modelSubtitleText: { color: Colors.grayDark },
  nameText: { color: Colors.black, fontSize: 18 },
  trainButtonStyle: { backgroundColor: Colors.secondary, marginRight: 8 },
});
export default styles;
