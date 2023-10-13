import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, Alert, signIn } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import HeadingComp from '../components/HeadingComp';
import CustomButton from '../components/CustomButton';
import TouchableText from '../components/TouchableText';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      // Missing email or password, show an alert
      Alert.alert(
        'Error',
        'Please enter both email and password to continue.',
        [{ text: 'OK' }]
      );
      setEmail(''); 
      setPassword(''); 
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // User logged in successfully
        navigation.navigate('HomeScreen');
      } else {
        // Authentication failed, show an alert
        Alert.alert(
          'Error',
          'Incorrect email or password. Please try again.',
          [{ text: 'OK' }]
        );
        setEmail(''); 
        setPassword(''); 
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again later.', [{ text: 'OK' }]);
      setEmail(''); 
      setPassword(''); 
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      }
    }
  };


  return (
    <ImageBackground
      source={require('../images/TopCrop.jpeg')}
      style={styles.background}>
      <View style={styles.container}>
        <HeadingComp text="Login to your account" style={styles.Heading} />
        {/* EmailInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Email</Text>
          <CustomTextInput
            placeholder="Enter your Email"
            onChangeText={(newText) => setEmail(newText)}
            value={email}
            placeholderTextColor="gray"
            iconName="envelope"
          />
        </View>
        {/* PasswordInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Password</Text>
          <CustomTextInput
            placeholder="Enter your Password"
            onChangeText={(newText) => setPassword(newText)}
            secureTextEntry={true}
            value={password}
            placeholderTextColor="#808080"
            iconName="lock"
          />
          <TouchableText
            text="Forget Password?"
            onPress={() => {
              navigation.navigate('ForgetScreen');
            }}
            style={styles.Touchabletext}
          />
        </View>
        {/* LoginButton */}
        <CustomButton
          title="Log In"
          onPress={handleLogin}
          iconName="login"
        />
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle} // Corrected to call signInWithGoogle function
        />
        <View style={styles.TextRegister}>
          <Text>Don't have an account?</Text>
          <TouchableText
            text="Register"
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}
            style={styles.accountRegister}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    marginTop: 120,
    marginBottom: 25,
  },
  inputGroup: {
    alignItems: 'flex-start',
  },
  text: {
    color: '#F6F5D7',
  },
  Touchabletext: {
    paddingLeft: 155,
    paddingTop: 8,
  },
  TextRegister: {
    flexDirection: 'row',
    marginTop: 60,
  },
  accountRegister: {
    fontWeight: 'bold',
    paddingLeft: 8,
    fontSize: 15,
  },
});

export default LoginScreen;
