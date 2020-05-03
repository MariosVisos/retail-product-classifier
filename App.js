import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { AppLoading, SplashScreen } from 'expo';
import Main from './src/Main';
import configureStore from './src/store/configureStore';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [userTokens, setUserTokens] = useState(null);

  async function loadInitialData() {
    const tokens = await AsyncStorage.getItem('userTokens');
    setUserTokens(tokens);
  }

  function handleAppLoadingFinish(e) {
    setIsAppReady(true);
    SplashScreen.hide();
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

  // axios.defaults.baseURL = 'http://192.168.1.18:5000';
  // // axios.defaults.headers.common.Authorization = AUTH_TOKEN;

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
        <Main tokens={userTokens} />
      </SafeAreaProvider>
    </Provider>
  );
}
