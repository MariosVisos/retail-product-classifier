import React from 'react';
import { ImageBackground } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import Button from '../ui/Button/Button';
import styles from './CameraTutorialOverlayStyles';

const { imageStyle, overlayStyle, cancelButtonContainer } = styles;

const CameraTutorialOverlay = ({ isVisible, onBackdropPress }) => {
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
        resizeMode="cover"
      >
        <Button
          onPress={onBackdropPress}
          containerStyle={cancelButtonContainer}
          icon={<Entypo name="circle-with-cross" size={32} />}
          raised
          type="outline"
        />
      </ImageBackground>
    </Overlay>
  );
};

export default CameraTutorialOverlay;
