import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppLoading } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import Main from './src/Main';
import configureStore from './src/store/configureStore';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [userData, setUserData] = useState(null);

  async function loadInitialData() {
    const userJson = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJson);
    if (user) {
      axios.defaults.headers.common.Authorization = `Bearer ${user.tokens.accessToken}`;
      setUserData(user);
    }
  }

  function handleAppLoadingFinish() {
    setIsAppReady(true);
    SplashScreen.hideAsync();
  }

  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={loadInitialData}
        onFinish={handleAppLoadingFinish}
        onError={console.warn}
        autoHideSplash={false}
      />
    );
  }

  // axios.defaults.headers.common.Authorization = AUTH_TOKEN;

  // async function registerUser() {
  //   try {
  //     const response = await axios.post('/register', {
  //       username: 'nikikark',
  //       password: '12345',
  //     });
  //     console.log('registerUser -> response', response);
  //   } catch (error) {
  //     console.log('registerUser -> error', error);
  //   }
  // }
  // registerUser();

  const store = configureStore();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Main userData={userData} />
      </SafeAreaProvider>
    </Provider>
  );
}
