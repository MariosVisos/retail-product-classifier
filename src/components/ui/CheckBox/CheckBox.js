import React from 'react';
import { CheckBox } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import styles from './CheckBoxStyles';

const Checkbox = ({
  title,
  checked,
  onIconPress,
  onPress,
  checkedColor,
  uncheckedColor,
  textStyle,
  containerStyle,
  size,
}) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      onIconPress={onIconPress}
      onPress={onPress}
      checkedColor={checkedColor || Colors.secondary}
      uncheckedColor={uncheckedColor || Colors.grayDark}
      textStyle={{ ...styles.text, ...textStyle }}
      containerStyle={{ ...styles.container, ...containerStyle }}
      size={size || 20}
      wrapperStyle={styles.wrapper}
    />
  );
};

export default Checkbox;
