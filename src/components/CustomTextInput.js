import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomTextInput = ({ placeholder, onChangeText, secureTextEntry, value, placeholderTextColor, iconName }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="#001238" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder} 
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        value={value}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
    backgroundColor: '#F6F5D7',
    borderRadius: 7,
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 14, 
    color: '#001238',
  },
});

export default CustomTextInput;
