import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import Colors from '../../constants/Colors';
import styles from './SignInScreenStyles';
import Button from '../../components/Button/Button';
import { signUp } from '../../store/actions';

const SignInScreen = () => {
  const {
    container,
    buttonContainerStyle,
    forgotPasswordTextStyle,
    forgotPasswordContainerStyle,
    signUpTextStyle,
  } = styles;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef(null);

  const dispatch = useDispatch();

  function handleEmailSubmitEditing() {
    passwordInputRef.current.focus();
  }

  function handleEmailTextChange(text) {
    setEmail(text);
  }
  function handlePasswordTextChange(text) {
    setPassword(text);
  }
  function handleSignUpPress() {
    dispatch(signUp({ email, password }));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={container}>
        <Input
          placeholder="email@address.com"
          label="Email"
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope',
            color: Colors.secondary,
            size: 20,
          }}
          keyboardType="email-address"
          onSubmitEditing={handleEmailSubmitEditing}
          blurOnSubmit={false}
          onChangeText={handleEmailTextChange}
        />
        <Input
          ref={passwordInputRef}
          placeholder="Password"
          label="Password"
          leftIcon={{
            type: 'font-awesome',
            name: 'lock',
            color: Colors.secondary,
          }}
          secureTextEntry
          onChangeText={handlePasswordTextChange}
        />
        <TouchableOpacity style={forgotPasswordContainerStyle}>
          <Text style={forgotPasswordTextStyle}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button title="Sign in" containerStyle={buttonContainerStyle} />
        <Text style={signUpTextStyle}>Don&apos;t have an account?</Text>
        <Button
          title="Sign up"
          containerStyle={buttonContainerStyle}
          onPress={handleSignUpPress}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
