import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'
import SplashScreen from 'react-native-smart-splash-screen'
import FBSDK, {
  LoginButton,
  AccessToken,
  LoginManager
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
  

  render() {


    return (
      <Image source={require('../src/bg.jpg')} style={styles.bgContainer} resizeMode={Image.resizeMode.sretch}>
        <View style={styles.container}>
            <Image source={require('../src/logo_wh.png')} style={styles.logo} ></Image>
          
            <TouchableOpacity
              onPress={this.handleFacebookLogin}>
              <Text style={stylesEs.fbButtonText} >Entrar con Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={stylesEs.gButtonText} >Entrar con Google +</Text>
            </TouchableOpacity>

             <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={ this.handleLoginFinished }
          onLogoutFinished={ this.handleButtonPress }
          />
        </View>
        
      </Image>
    );
  }
    handleFacebookLogin () {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          Actions.root()
          this.authenticateUser()
              
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
      
    )
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
    if (credential = null) {
      Actions.login()
        
      }
  }
}
const stylesEs = EStyleSheet.create({

  fbButtonText: {
    width: '70%',
    height: '2rem',
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#4267B8',
    opacity: 0.8,
    paddingVertical: 5,
    marginTop: '2rem',
  },
  gButtonText: {
    width: '70%',
    height: '2rem',
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#ff4141',
    opacity: 0.7,
    paddingVertical: 5,
    marginTop: '1rem',
  },

});
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

