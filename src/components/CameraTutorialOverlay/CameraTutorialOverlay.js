import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import Button from '../ui/Button/Button';
import styles from './CameraTutorialOverlayStyles';
import Colors from '../../constants/Colors';
import Checkbox from '../ui/CheckBox/CheckBox';

const {
  imageStyle,
  overlayStyle,
  cancelButtonContainer,
  checkBoxContainer,
  statusBarCover,
} = styles;

const CameraTutorialOverlay = ({
  isVisible,
  onBackdropPress,
  onCheckBoxPress,
  checked,
  step,
}) => {
  let uri = '';
  switch (step) {
    case 1:
      uri = 'https://media.giphy.com/media/QZgzbNMN4LTNCADLy0/giphy.gif';
      break;
    case 2:
      uri = 'https://media.giphy.com/media/j72v5AvizjzM3DUSlS/giphy.gif';
      break;
    case 3:
      uri = 'https://media.giphy.com/media/ZYL8DAzhKtR2snLY4I/giphy.gif';
      break;
    case 4:
      uri = 'https://media.giphy.com/media/cilTxIRpKtuMIxj1HR/giphy.gif';
      break;
    case 5:
      uri = 'https://media.giphy.com/media/fxa5kYcNBt4jUtNjWe/giphy.gif';
      break;
    case 6:
      uri = 'https://media.giphy.com/media/ZdI6six6eLpc0kUNqp/giphy.gif';
      break;

    default:
      break;
  }
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={overlayStyle}
      fullScreen
    >
      <ImageBackground
        source={{
          uri,
        }}
        style={imageStyle}
        resizeMode="stretch"
      >
        <View style={statusBarCover} />
        <Checkbox
          title="Don't show this again"
          checked={checked}
          onIconPress={onCheckBoxPress}
          onPress={onCheckBoxPress}
          checkedColor={Colors.secondary}
          uncheckedColor={Colors.grayDark}
          containerStyle={checkBoxContainer}
        />
        <Button
          onPress={onBackdropPress}
          containerStyle={cancelButtonContainer}
          icon={<Entypo name="cross" size={32} color={Colors.black} />}
          raised
          type="outline"
        />
      </ImageBackground>
    </Overlay>
  );
};

export default CameraTutorialOverlay;
