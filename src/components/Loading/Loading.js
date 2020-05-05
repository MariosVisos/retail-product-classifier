import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
import styles from './LoadingStyles';

const Loading = () => {
  const { container, textStyle } = styles;
  const loadingText = useSelector(state => state.ui.loadingText);
  return (
    <View style={container}>
      <Text style={textStyle}>{loadingText || 'Loading...'}</Text>
      <ActivityIndicator size="large" color={Colors.secondary} />
    </View>
  );
};

export default Loading;
