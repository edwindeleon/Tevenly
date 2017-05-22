import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Platform,
} from 'react-native';

import {Scene, Router} from 'react-native-router-flux'

import LoginView from './components/LoginView'
import HomeView from './components/HomeView'

class Tevenly extends React.Component {
  render() {
    return <Router>
      <Scene key="login" component={LoginView} hideNavBar />
      <Scene key="root">
        <Scene key="home" component={HomeView} hideNavBar />
      </Scene>
    </Router>
  }
}
AppRegistry.registerComponent('Tevenly', () => Tevenly);