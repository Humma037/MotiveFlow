import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const CustomHeader = ({ title, leftIconName, onLeftIconPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLeftIconPress}>
        <Icon name={leftIconName} size={35} color="#F6F5D7" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#00254f',
    height: 60,
    // paddingHorizontal: 8,
    position:'absolute',
    zIndex:99999999,
    left:10,
    bottom:15,
    top:15,
    borderRadius:10,
    width:'95%'
 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F6F5D7',
    marginRight:20
  },
  icon: {
   marginRight:25,
  },
});

export default CustomHeader;
