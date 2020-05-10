import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  buttonsContainer: { flexDirection: 'row' },
  classifyButtonStyle: { backgroundColor: Colors.secondary },
  container: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    padding: 8,
  },
  labelSubtitleText: { color: Colors.grayDark },
  modelSubtitleText: { color: Colors.grayDark },
  nameText: { color: Colors.black, fontSize: 18 },
  trainButtonStyle: { backgroundColor: Colors.secondary, marginRight: 8 },
});
export default styles;
