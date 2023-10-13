import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingComp = ({ text, size, color, style }) => {
  const headingStyles = {
    fontSize: size || 22, 
    color: color || '#F6F5D7', 
    ...style, 
  };

  return (
    <Text style={[styles.heading, headingStyles]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
  },
});

export default HeadingComp;
