import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

import { Actions } from 'react-native-router-flux'

import firebase, { firebaseAuth } from "./firebase";

const { FacebookAuthProvider } = firebase.auth;

export default class HomeView extends Component {


  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Bienvenidos a Tevenly!
        </Text>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={ this.handleLoginFinished }
          onLogoutFinished={ this.handleButtonPress }
          />
      </View>
    );
  }


handleLoginFinished = (error, result) => {
    if (error) {
      console.error(error)
    } else if (result.isCancelled) {
      console.warn("login is cancelled.");
    } else {
      this.authenticateUser()
    }
  }

  handleButtonPress = (error, result) => {
    if (error) {
        console.error(error)
      }
      else {
      Actions.login()
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: Platform.select({
      ios: 30,
      android: 10
    }),
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});