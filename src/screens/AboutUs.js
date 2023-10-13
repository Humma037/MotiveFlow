import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HeadingComp from '../components/HeadingComp'; // Make sure to import your HeadingComp from the correct path

const aboutData = [
  {
    id: '1',
    title: 'About Us',
    content:
      "Welcome to Daily Dose of Wisdom! We're on a mission to bring daily wisdom to your life. Our app offers thought-provoking quotes, articles, and insights to inspire and empower you.",
  },
  {
    id: '2',
    title: 'Our Story',
    content:
      'Our journey began with a simple idea: to make wisdom accessible to everyone, every day. We believe that wisdom is not something reserved for scholars and philosophers alone, but a valuable resource that can enrich the lives of people from all walks of life.',
  },
  {
    id: '3',
    title: 'What We Offer',
    content:
      'Explore a wide range of topics, from classical philosophy to modern personal development. Our content is designed to be accessible, relatable, and relevant to your daily life.',
  },
  {
    id: '4',
    title: 'Our Commitment',
    content:
      'At Daily Dose of Wisdom, we are committed to promoting a culture of wisdom and personal growth. We believe that small daily doses of wisdom can lead to significant positive changes in your life. Our goal is to be your trusted source for insights, inspiration, and guidance on your journey towards a more meaningful and fulfilling life.',
  },
];

const AboutUs = () => {
  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <HeadingComp text={item.title} size={28} color="#F6F5D7" style={styles.heading} />
      <Text style={styles.text}>{item.content}</Text>
    </View>
  );

  return (
    <FlatList
      data={aboutData}
      keyExtractor={(item) => item.id}
      renderItem={renderListItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001238',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#F6F5D7',
    textAlign: 'justify',
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 20,
  },
});

export default AboutUs;
