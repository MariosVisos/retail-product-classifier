import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/ui/Input/Input';
import Colors from '../../constants/Colors';
import styles from './SignInScreenStyles';
import Button from '../../components/ui/Button/Button';
import {
  signUp,
  setSignUpError,
  signIn,
  setSignInError,
} from '../../store/actions';
import Loading from '../../components/Loading/Loading';

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
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const passwordInputRef = useRef(null);

  const dispatch = useDispatch();

  const isSigningIn = useSelector(state => state.user.isSigningIn);
  const isSigningUp = useSelector(state => state.user.isSigningUp);
  const signUpError = useSelector(state => state.user.signUpError);
  const signInError = useSelector(state => state.user.signInError);

  function handleEmailSubmitEditing() {
    passwordInputRef.current.focus();
  }

  function handleEmailTextChange(text) {
    if (!isEmailValid) {
      setIsEmailValid(true);
    }
    if (signUpError) {
      dispatch(setSignUpError(null));
    }
    if (signInError) {
      dispatch(setSignInError(null));
    }
    setEmail(text);
  }
  function handlePasswordTextChange(text) {
    if (!isPasswordValid) {
      setIsPasswordValid(true);
    }
    setPassword(text);
  }
  function handleSignUpPress() {
    const validEmail = email.split('@').length - 1 === 1;
    const emptyPassword = password.length === 0;
    if (validEmail && !emptyPassword) {
      dispatch(signUp({ email, password }));
    } else {
      if (!validEmail) {
        setIsEmailValid(false);
      }
      if (emptyPassword) {
        setIsPasswordValid(false);
      }
    }
  }

  function handleSignInPress() {
    const validEmail = email.split('@').length - 1 === 1;
    const emptyPassword = password.length === 0;
    if (validEmail && !emptyPassword) {
      dispatch(signIn({ email, password }));
    } else {
      if (!validEmail) {
        setIsEmailValid(false);
      }
      if (emptyPassword) {
        setIsPasswordValid(false);
      }
    }
  }

  function getEmailErrorMessage() {
    if (!isEmailValid) {
      return 'Enter the email in the format someone@example.com!';
    }
    if (signUpError) {
      return signUpError.message;
    }
    return '';
  }

  function getPasswordErrorMessage() {
    if (!isPasswordValid) {
      return 'The password cannot be empty!';
    }
    if (signUpError) {
      return signUpError.message;
    }
    return '';
  }

  if (isSigningUp || isSigningIn) {
    return <Loading />;
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
          errorMessage={getEmailErrorMessage()}
          value={email}
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
          value={password}
          errorMessage={getPasswordErrorMessage()}
        />
        <TouchableOpacity style={forgotPasswordContainerStyle}>
          <Text style={forgotPasswordTextStyle}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button
          title="Sign in"
          containerStyle={buttonContainerStyle}
          onPress={handleSignInPress}
        />
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
