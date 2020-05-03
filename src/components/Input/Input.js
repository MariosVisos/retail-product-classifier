import React from 'react';
import { Input as Inp } from 'react-native-elements';
import styles from './InputStyles';
import Colors from '../../constants/Colors';

function Input({
  placeholder,
  label,
  labelStyle,
  containerStyle,
  leftIconContainerStyle,
  onChangeText,
  leftIcon = false,
  secureTextEntry = false,
  keyboardType = 'default',
  onSubmitEditing,
}) {
  let marginRight = 0;
  if (leftIcon) {
    marginRight = 4;
  }
  return (
    <Inp
      placeholder={placeholder}
      label={label}
      containerStyle={[styles.containerStyle, containerStyle]}
      labelStyle={[styles.labelStyle, labelStyle]}
      leftIconContainerStyle={[
        styles.leftIconContainerStyle,
        leftIconContainerStyle,
        { marginRight },
      ]}
      leftIcon={leftIcon}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      enablesReturnKeyAutomatically
      maxLength={200}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
}

export default Input;
