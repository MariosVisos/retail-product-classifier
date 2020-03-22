import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/Main';
import configureStore from './src/store/configureStore';

const Stack = createStackNavigator();

export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
