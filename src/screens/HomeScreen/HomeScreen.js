import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './HomeScreenStyles';
import Colors from '../../constants/Colors';
import Button from '../../components/Button/Button';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>hey there</Text>
      <Button
        onPress={() => navigation.navigate('Camera')}
        icon={<Entypo name="camera" size={28} color={Colors.primary} />}
        title="Train"
      />
    </View>
  );
};

export default HomeScreen;
