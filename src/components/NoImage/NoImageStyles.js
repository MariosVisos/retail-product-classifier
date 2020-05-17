import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    // flex: 1,
    // height: '100%',
    // justifyContent: 'center',
    // width: '100%',
  },
  noImageText: { color: Colors.blackLight, fontSize: 12, fontWeight: 'bold' },
});
export default styles;
