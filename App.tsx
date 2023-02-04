/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Home from './src/pages/home/HomePage';
import Login from './src/pages/login/LoginPage'
import SplashPage from './src/pages/splash/SplashPage';
import RouteApp from './src/utils/AppRouteSetting'

function App(): JSX.Element {
  return (
    <RouteApp />
  );
}

const styles = StyleSheet.create({});

export default App;
