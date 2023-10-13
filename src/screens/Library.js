import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Library = ({ route }) => {
  const { likedStoryCards } = route.params;

  if (!Array.isArray(likedStoryCards)) {
    return (
      <View style={styles.container}>
        <Text>No liked stories available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>List of Liked Stories:</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        {likedStoryCards.map((story, index) => (
          <View style={styles.card} key={index}>
            <Text>{story}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  scrollViewContent: {
    flexDirection: 'row', // Horizontal scrolling
  },
  card: {
    padding: 20,
    backgroundColor: 'white',
    marginRight: 10, // Adjust as needed
  },
});

export default Library;
