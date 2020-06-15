import React from 'react';
import { ImageBackground } from 'react-native';
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
} = styles;

const CameraTutorialOverlay = ({
  isVisible,
  onBackdropPress,
  onCheckBoxPress,
  checked,
}) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={overlayStyle}
      fullScreen
    >
      <ImageBackground
        source={{
          uri: 'https://media.giphy.com/media/d8odUf2SE8yPJwWxcH/giphy.gif',
        }}
        style={imageStyle}
        resizeMode="stretch"
      >
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
