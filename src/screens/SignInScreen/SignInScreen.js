import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/Input/Input';
import Colors from '../../constants/Colors';
import styles from './SignInScreenStyles';
import Button from '../../components/Button/Button';

const SignInScreen = () => {
  const {
    container,
    buttonContainerStyle,
    forgotPasswordTextStyle,
    forgotPasswordContainerStyle,
    signUpTextStyle,
    signUpContainerStyle,
  } = styles;
  return (
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
      />
      <Input
        placeholder="Password"
        label="Password"
        leftIcon={{
          type: 'font-awesome',
          name: 'lock',
          color: Colors.secondary,
        }}
        secureTextEntry
      />
      <TouchableOpacity style={forgotPasswordContainerStyle}>
        <Text style={forgotPasswordTextStyle}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button title="Sign in" containerStyle={buttonContainerStyle} />
      <Text style={signUpTextStyle}>Don&apos;t have an account?</Text>
      <Button title="Sign up" containerStyle={buttonContainerStyle} />
    </View>
  );
};

export default SignInScreen;
