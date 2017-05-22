import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image
} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen'
import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

import { Actions } from 'react-native-router-flux'

import firebase, { firebaseAuth } from "./firebase";

const { FacebookAuthProvider } = firebase.auth;

export default class LoginView extends Component {

  componentDidMount () {
     //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
     SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500,
     })
  }
  state = {
    credential: null
  }

  componentWillMount() {
    this.authenticateUser();
  }

  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken } = data
      const credential = FacebookAuthProvider.credential(accessToken)
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        this.setState({ credentials })
        Actions.root()
      }, (error) => {
        console.log("Sign in error", error)
      })
    })
  }


  render() {

    return (
      <Image source={require('../src/bg.jpg')} style={styles.bgContainer} resizeMode={Image.resizeMode.sretch}>
        <View style={styles.container}>
            <Image source={require('../src/logo_wh.png')} style={styles.logo} ></Image>
          <Text style={styles.welcome}>
            Bienvenidos a Tevenly!
          </Text>
        </View>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={ this.handleLoginFinished }
          onLogoutFinished={ this.handleButtonPress }/>
      </Image>
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
  handleButtonPress = () => {
    Actions.login()
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.select({
      ios: 30,
      android: 10
    }),
    alignItems: 'center',
  },
  logo: {
    marginTop: 45,
    width: 350,
    height: 160,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
