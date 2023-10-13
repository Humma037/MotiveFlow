import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, likedCards } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ProfileInfoComp from '../components/ProfileInfoComp';
import TouchableText from '../components/TouchableText';
import SignOutButton from '../components/SignOutButton';

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const userId = auth().currentUser ? auth().currentUser.uid : null;

    if (userId) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            setProfileData(data);
          }
        });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const selectProfilePicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        console.log('Selected and cropped image:', image);
        const userId = auth().currentUser ? auth().currentUser.uid : null;
        if (userId) {
          firestore()
            .collection('users')
            .doc(userId)
            .update({
              profilePictureURL: image.path,
            })
            .then(() => {
              console.log('Profile picture updated successfully');
            })
            .catch((error) => {
              console.error('Error updating profile picture:', error);
            });
        }
      })
      .catch((error) => {
        console.error('ImagePicker Error:', error);
      });
  };

  const SignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: handleSignOut, // Call handleSignOut when OK is pressed
        },
      ],
      { cancelable: false }
    );
  };

  const handleSignOut = () => {
    console.log('Before sign-out: Current user:', auth().currentUser);

    auth()
      .signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });

    console.log('After sign-out: Current user:', auth().currentUser);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" size={25} color="#F6F5D7" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ProfileInfoComp profileData={profileData} selectProfilePicture={selectProfilePicture} />
      <Text style={styles.Title}>General</Text>
      <View style={styles.General}>
        <View style={styles.textdirection}>
          <Icon name="infocirlce" size={22} color="#F6F5D7" style={styles.backIcon} />
          <TouchableText text="About us" onPress={() => { navigation.navigate('AboutUs') }} style={styles.SettingOptions} />
        </View>
        <View style={styles.textdirection}>
          <Icon name="save" size={22} color="#F6F5D7" style={styles.backIcon} />
          <TouchableText text="Favorite / Library"
            onPress={() => {
              navigation.navigate('Library', { favoriteStories: likedCards });
            }}
            style={styles.SettingOptions} />
        </View>
        <View style={styles.textdirection}>
          <Icon name="swap" size={22} color="#F6F5D7" style={styles.backIcon} />
          <TouchableText text="Change Theme" onPress={() => { navigation.navigate('RegisterScreen') }} style={styles.SettingOptions} />
        </View>
        <View style={styles.textdirection}>
          <Icon name="delete" size={22} color="#F6F5D7" style={styles.backIcon} />
          {/* Pass the SignOut function as a prop */}
          <SignOutButton text="Delete Account" onPress={SignOut} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001238',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001238',
    padding: 15,
    marginBottom: 0
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F6F5D7',
    textAlign: 'center',
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F6F5D7',
    marginTop: 60,
    marginBottom: 25,
    paddingLeft: 10
  },
  profileImageContainer: {
    position: 'relative',
    width: 130,
    height: 130,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
    marginLeft: 10
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  textdirection: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  SettingOptions: {
    color: '#F6F5D7'
  },
  General: {
    paddingHorizontal: 20,
  }
});

export default ProfileScreen;
