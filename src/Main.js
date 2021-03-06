import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import DatasetScreen from './screens/DatasetScreen/DatasetScreen';
import LabelScreen from './screens/LabelScreen/LabelScreen';
import CameraScreen from './screens/CameraScreen/CameraScreen';
import ImageScreen from './screens/ImageScreen/ImageScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import Colors from './constants/Colors';
import { setUserData } from './store/actions';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPasswordScreen';

const { primary, secondary, secondaryLight } = Colors;
const headerBackgroundColor = secondary;
const headerTintColor = primary;
const activeTintColor = secondary;
const inactiveTintColor = secondaryLight;
const tabBackgroundColor = primary;

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const AuthStack = createStackNavigator();

const showHeaderOptions = {
  headerStyle: {
    backgroundColor: headerBackgroundColor,
  },
  headerTintColor,
  title: 'Retail Product Classifier',
};

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
  // const { state, params } = route;
  // Access the tab navigator's state using `route.state`
  const routeName = getFocusedRouteNameFromRoute(route);
  // ? // Get the currently active route name in the tab navigator
  //   state.routes[state.index].name
  // : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
  //   // In our case, it's "Home" as that's the first screen inside the navigator
  //   params?.screen || 'Home';
  if (routeName === 'BarCode' || routeName === 'Camera') {
    return false;
  }
  return true;
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...showHeaderOptions,
        }}
      />
      <HomeStack.Screen
        name="Dataset"
        component={DatasetScreen}
        options={({ route }) => ({
          ...showHeaderOptions,
          title: route.params.dataset.name,
        })}
      />
      <HomeStack.Screen
        name="Label"
        component={LabelScreen}
        options={({ route }) => ({
          ...showHeaderOptions,
          title: route.params.label.name,
        })}
      />
      <HomeStack.Screen
        name="Image"
        component={ImageScreen}
        options={() => ({
          ...showHeaderOptions,
          title: 'Image details',
        })}
      />
      <HomeStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...showHeaderOptions,
        }}
      />
    </SettingsStack.Navigator>
  );
}

function renderAuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          ...showHeaderOptions,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

function renderTabNavigator() {
  return (
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
        component={HomeStackNavigator}
        options={({ route }) => ({ tabBarVisible: isCameraScreen(route) })}
      />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
}

function Main({ userData }) {
  const dispatch = useDispatch();
  if (userData) {
    dispatch(setUserData(userData));
  }
  const userTokens = useSelector(state => state.user.tokens);
  return (
    <NavigationContainer>
      {userTokens.accessToken == null
        ? renderAuthStackNavigator()
        : renderTabNavigator()}
    </NavigationContainer>
  );
}

export default Main;
