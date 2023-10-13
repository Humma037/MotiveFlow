import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileInfoComp = ({ profileData, selectProfilePicture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImageWrapper}>
        {profileData && profileData.profilePictureURL ? (
          <Image
            source={{ uri: profileData.profilePictureURL }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileIcon}>
            <Icon
              name="user"
              size={55}
              color="#ffff"
            />
          </View>
        )}
      </View>
      {selectProfilePicture && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={selectProfilePicture}
        >
          <Icon
            name="camera"
            size={26}
            color="#ffff"
          />
        </TouchableOpacity>
      )}
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {profileData && profileData.fullName
            ? profileData.fullName
            : 'Loading...'}
        </Text>
        <Text style={styles.email}>
          {profileData && profileData.email
            ? profileData.email
            : 'Loading...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: 'hidden',
    marginRight: 10,
    borderColor: '#fff',
    borderWidth: 1
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10
  },
  profileIcon: {
    alignItems: 'center',
    marginTop: 17
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#F6F5D7',
  },
  email: {
    fontSize: 14,
    color: '#F6F5D7',
  },
  iconContainer: {
    position: 'absolute',
    top: 60,
    left: 70,
    borderRadius: 20,
    padding: 5,
    zIndex: 9999999,
  },

});

export default ProfileInfoComp;
