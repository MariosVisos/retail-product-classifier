import React, { forwardRef } from 'react';
import { Input as Inp } from 'react-native-elements';
import styles from './InputStyles';

const Input = (
  {
    placeholder,
    label,
    labelStyle,
    containerStyle,
    leftIconContainerStyle,
    onChangeText,
    value,
    leftIcon = false,
    secureTextEntry = false,
    keyboardType = 'default',
    onSubmitEditing,
    blurOnSubmit = true,
    errorMessage,
  },
  ref,
) => {
  let marginRight = 0;
  if (leftIcon) {
    marginRight = 4;
  }
  return (
    <Inp
      ref={ref}
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
      maxLength={200}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={blurOnSubmit}
      errorMessage={errorMessage}
      value={value}
    />
  );
};

export default forwardRef(Input);
