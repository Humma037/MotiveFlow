import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import TouchableText from '../components/TouchableText';
import CustomTextInput from '../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegister = async () => {
    // Check for missing input fields
    if (!email || !password || !fullName) {
      Alert.alert(
        'Error',
        'Please fill in all fields to register.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Check password length
    if (password.length < 8) {
      Alert.alert(
        'Error',
        'Password must be at least 8 characters long.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        const usersCollection = firestore().collection('users');
        await usersCollection.doc(userCredential.user.uid).set({
          email,
          fullName,
        });

        console.log('User data saved successfully!');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        );
      } else {
        Alert.alert('Error', 'An error occurred during registration. Please try again later.', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'An error occurred during registration. Please try again later.', [{ text: 'OK' }]);
    }
  };

  return (
    <ImageBackground
      source={require('../images/TopCrop.jpeg')}
      style={styles.background}>
      <View style={styles.container}>
        {/* FullName Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.text}>FullName</Text>
          <CustomTextInput
            style={styles.input}
            placeholder="Full Name"
            keyboardType="default"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholderTextColor="#808080"
            iconName="user"
          />
        </View>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Email</Text>
          <CustomTextInput
            placeholder="Enter your Email"
            onChangeText={(newText) => setEmail(newText)}
            value={email}
            placeholderTextColor="#808080"
            iconName="envelope"
          />
        </View>
        {/* Password Input */}
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
        </View>
        {/* Register Button */}
        <CustomButton
          title="Register"
          onPress={handleRegister}
          iconName="slack"
        />
        <View style={styles.TextRegister}>
          <Text>Already have an account?</Text>
          <TouchableText
            text="Login"
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'LoginScreen' }],
                })
              );
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
    marginTop:90
  },
  inputGroup: {
    alignItems: 'flex-start',
  },
  text: {
    color: '#F6F5D7',
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

export default Register;
