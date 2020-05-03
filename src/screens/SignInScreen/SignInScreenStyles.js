import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  buttonContainerStyle: { width: '88%' },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  forgotPasswordContainerStyle: { marginVertical: 8 },
  forgotPasswordTextStyle: {
    color: Colors.grayDark,
    textDecorationLine: 'underline',
  },
  signUpContainerStyle: { marginVertical: 8 },
  signUpTextStyle: {
    color: Colors.grayDark,
    textDecorationLine: 'underline',
  },
});

export default styles;
