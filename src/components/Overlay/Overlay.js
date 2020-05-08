import React from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './styles';

function CustomOverlay({
  isVisible,
  onBackdropPress,
  overlayStyle,
  backDropStyle,
  headerTitle,
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
      {children}
    </Overlay>
  );
}

export default CustomOverlay;
