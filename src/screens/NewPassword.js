import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, ImageBackground } from 'react-native';
import TextInputComp from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import HeadingComp from '../components/HeadingComp';

const NewPassword = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      if (code === '') {
        throw new Error('Verification code is required.');
      }

      // Confirm the password reset with the received code
      await auth().confirmPasswordReset(code);

      // Password reset successful, navigate to the home screen or login screen
      navigation.navigate('HomeScreen'); // Replace with the screen you want to navigate to
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', error.message || 'Please try again', [{ text: 'OK' }]);
    }
  };

  return (
    <ImageBackground
      source={require('../images/TopCrop.jpeg')}
      style={styles.background}>
      <View style={styles.container}>
        <HeadingComp text="Reset Password" style={styles.Heading} />
        <Text style={styles.AlertMsg}>
          Please enter the verification code you received via email.
        </Text>
        <TextInputComp
          placeholder="Verification Code"
          onChangeText={(newCode) => setCode(newCode)}
          value={code}
          placeholderTextColor="gray"
        />
        <CustomButton
          title={loading ? 'Resetting...' : 'Reset Password'}
          onPress={handleResetPassword}
          buttonStyle={styles.LoginButton}
          disabled={loading}
        />
        {loading && <ActivityIndicator size="small" color="white" />}
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
    marginRight: 110,
  },
  LoginButton: {
    marginTop: 50,
  },
  AlertMsg: {
    width: '84%',
    color: '#F6F5D7',
    paddingVertical: 10,
  },
});

export default NewPassword;
