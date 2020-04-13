import React from 'react';
import { Text, View } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import { Image } from 'react-native-elements';
import styles from './SettingsScreenStyles';

const SettingsScreen = () => {
  // const [imageUri, setImageUri] = useState(null);
  // const directory = `${FileSystem.documentDirectory}myImages`;
  // async function getFileSystemInfo() {
  //   const info = await FileSystem.getInfoAsync(directory);
  //   const contents = await FileSystem.readDirectoryAsync(info.uri);
  //   console.log('getFileSystemInfo -> info', info);
  //   console.log('getFileSystemInfo -> contents', contents);
  //   setImageUri(`${info.uri}/${contents[0]}`);
  // }
  // useEffect(() => {
  //   getFileSystemInfo();
  // });
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: imageUri }} style={{ width: 348, height: 400 }} /> */}
      <Text>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;
