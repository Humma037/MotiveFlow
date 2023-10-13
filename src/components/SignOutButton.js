import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignOutButton = ({ onPress }) => {
    const [signOutConfirmationVisible, setSignOutConfirmationVisible] = useState(false);

    const SignOut = () => {
        // Show the sign-out confirmation modal
        setSignOutConfirmationVisible(true);
    };

    const handleSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                setSignOutConfirmationVisible(false); 
                onPress(); 
            })
            .catch((error) => {
                console.error('Error signing out:', error.message);
            });
    };

    const cancelSignOut = () => {
        setSignOutConfirmationVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={SignOut}>
                <Text style={styles.signOutButton}>Sign Out</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={signOutConfirmationVisible}
                onRequestClose={cancelSignOut}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={cancelSignOut}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSignOut}>
                                <Text style={styles.signOutText}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    signOutButton: {
        color: '#F6F5D7',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        backgroundColor: '#F6F5D7',
        borderRadius: 5,
        padding: 16,
        width: 300,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 30,
        color: '#001238'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelText: {
        color: '#001238',
        fontSize: 14,
    },
    signOutText: {
        color: '#001238',
        fontSize: 14,
    },
});

export default SignOutButton;
