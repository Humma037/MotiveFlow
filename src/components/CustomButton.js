import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

const CustomButton = ({ title, onPress, iconName }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{title}</Text>
        {iconName && (
          <AntDesign name={iconName} size={20} color='#001238' style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 320,
    backgroundColor: '#F6F5D7',
    borderRadius: 7,
    padding: 10,
    marginTop:50
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#001238',
    fontSize: 17,
    marginRight: 10,
    fontWeight:'bold'
  },
  icon: {
    marginRight: 10,
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5, 
  },
});

export default CustomButton;
