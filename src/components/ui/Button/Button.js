import React from 'react';
import { Button as Btn } from 'react-native-elements';
import styles from './ButtonStyles';

function Button({
  title,
  icon,
  onPress,
  type = 'solid',
  buttonStyle,
  containerStyle,
  titleStyle,
  disabled,
  raised,
  iconRight,
}) {
  let marginLeft = 0;
  let marginRight = 0;
  if (icon && iconRight) {
    marginRight = 4;
  } else {
    marginLeft = 4;
  }
  let customButtonStyle =
    type === 'solid' ? styles.solidButtonStyle : styles.outlineButtonStyle;
  const customContainerStyle =
    type === 'solid'
      ? styles.solidContainerStyle
      : styles.outlineContainerStyle;
  const customTitleStyle =
    type === 'solid' ? styles.solidTitleStyle : styles.outlineTitleStyle;
  if (type === 'outline' && raised) {
    customButtonStyle = styles.outlineButtonRaised;
  }
  return (
    <Btn
      title={title}
      icon={icon}
      onPress={onPress}
      type={type}
      raised={raised}
      containerStyle={{ ...customContainerStyle, ...containerStyle }}
      buttonStyle={{ ...customButtonStyle, ...buttonStyle }}
      titleStyle={{
        ...customTitleStyle,
        ...titleStyle,
        marginLeft,
        marginRight,
      }}
      iconRight={iconRight}
      disabled={disabled}
    />
  );
}

export default Button;
