import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Categories = ({ backgroundImage, heading, subheading }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={backgroundImage} style={styles.image}>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 10,
    margin: 8,
    overflow: 'hidden',
    elevation: 5,
    borderWidth:7,
    borderColor:'#001f48'
  },
  image: {
    width: '100%',
    height: 115, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius:20
  },
  content: {
    padding: 3,
    backgroundColor:'#001f48',
    justifyContent:'center',
    alignItems:'center'
  },
  heading: {
    color: '#F6F5D7',
    fontSize: 13,
    fontWeight: 'bold',
  },
  subheading: {
    color: '#F6F5D7',
    fontSize: 12,
  },
});

export default Categories;
