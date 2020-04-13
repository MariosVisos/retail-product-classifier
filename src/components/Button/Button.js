import React from 'react';
import { Button as Btn } from 'react-native-elements';
import styles from './ButtonStyles';

function Button({
  title,
  icon,
  onPress,
  type,
  raised = true,
  buttonStyle,
  titleStyle,
  iconRight = false,
}) {
  let marginLeft = 0;
  let marginRight = 0;
  if (icon && iconRight) {
    marginRight = 4;
  } else {
    marginLeft = 4;
  }
  return (
    <Btn
      title={title}
      icon={icon}
      onPress={onPress}
      type={type}
      raised={raised}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      titleStyle={[styles.titleStyle, titleStyle, { marginLeft, marginRight }]}
      iconRight={iconRight}
    />
  );
}

export default Button;
