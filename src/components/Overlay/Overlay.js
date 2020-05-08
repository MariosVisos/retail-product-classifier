import React from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './OverlayStyles';
import Button from '../Button/Button';

function CustomOverlay({
  isVisible,
  onBackdropPress,
  overlayStyle,
  backDropStyle,
  headerTitle,
  applyButtonTitle,
  children,
}) {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={[styles.overlayStyle, overlayStyle]}
      backDropStyle={[styles.backDropStyle, backDropStyle]}
      animationType="fade"
    >
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
        {children}
        <View style={styles.footerContainer}>
          <Button onPress={onBackdropPress} type="outline" title="Cancel" />
          <Button title={applyButtonTitle} />
        </View>
      </>
    </Overlay>
  );
}

export default CustomOverlay;
