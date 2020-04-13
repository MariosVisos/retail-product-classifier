import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import CameraScreen from './screens/CameraScreen/CameraScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import Colors from './constants/Colors';

const { primary, secondary, secondaryLight } = Colors;
const headerBackgroundColor = secondary;
const headerTintColor = primary;
const activeTintColor = secondary;
const inactiveTintColor = secondaryLight;
const tabBackgroundColor = primary;

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function renderTabBarIcon({ color, size, route }) {
  let iconName;

  if (route.name === 'Home') {
    iconName = 'ios-home';
  } else if (route.name === 'Settings') {
    iconName = 'ios-settings';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

function isCameraScreen(route) {
  const { state, params } = route;
  // Access the tab navigator's state using `route.state`
  const routeName = state
    ? // Get the currently active route name in the tab navigator
      state.routes[state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Home" as that's the first screen inside the navigator
      params?.screen || 'Home';
  if (routeName === 'BarCode' || routeName === 'Camera') {
    return false;
  }
  return true;
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: headerBackgroundColor,
          },
          headerTintColor,
        }}
      />
      <HomeStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            renderTabBarIcon({ focused, color, size, route }),
        })}
        tabBarOptions={{
          activeTintColor,
          inactiveTintColor,
          tabStyle: { backgroundColor: tabBackgroundColor },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={({ route }) => ({ tabBarVisible: isCameraScreen(route) })}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;
