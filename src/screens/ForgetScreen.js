import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import HeadingComp from '../components/HeadingComp';
import CustomButton from '../components/CustomButton';
import TouchableText from '../components/TouchableText';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to continue.', [{ text: 'OK' }]);
      return;
    }

    try {
      // Check if the email exists in Firebase Authentication
      const userRecord = await auth().getUserByEmail(email);

      if (userRecord) {
        // Email is registered, send a password reset email
        await auth().sendPasswordResetEmail(email);

        Alert.alert(
          'Success',
          'A password reset email has been sent to your email address.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('NewPassword', { email });
              },
            },
          ]
        );
      } else {
        // Email is not registered
        Alert.alert(
          'Error',
          'This email is not registered. Please sign up first.',
          [{ text: 'OK' }]
        );
        navigation.navigate('RegisterScreen');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      Alert.alert(
        'Error',
        'An error occurred. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ImageBackground
      source={require('../images/TopCrop.jpeg')}
      style={styles.background}>
      <View style={styles.container}>
        <HeadingComp text="Forgot Password" style={styles.Heading} />
        <Text style={styles.message}>
          Please enter your email to reset your password.
        </Text>
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
        <CustomButton
          title="Reset Password"
          onPress={handleForgotPassword}
          iconName="arrowright"
        />
        <TouchableText
          text="Cancel"
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          style={styles.Touchabletext}
        />
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
    marginTop: 10,
    marginBottom: 25,
    marginRight: 80,
  },
  text: {
    color: '#F6F5D7',
  },
  message: {
    width: '84%',
    color: '#F6F5D7',
    paddingVertical: 10,
  },
});

export default ForgotPasswordScreen;
