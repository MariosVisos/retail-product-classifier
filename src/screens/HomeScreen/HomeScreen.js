import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import styles from './HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>hey there</Text>
      <Button
        onPress={() => navigation.navigate('Camera')}
        icon={<Entypo name="camera" size={32} />}
        raised
        type="outline"
      />
    </View>
  );
};

export default HomeScreen;
