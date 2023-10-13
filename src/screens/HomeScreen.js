import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Categories from '../components/Categories';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Check if the HomeScreen is focused
  const [firstCardText, setFirstCardText] = useState({});

  useEffect(() => {
    loadStories();

    // Setup BackHandler only when HomeScreen is focused
    if (isFocused) {
      const backAction = () => {
        BackHandler.exitApp(); // Exit the app
        return true; // Prevent default behavior (exit the app)
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        backHandler.remove(); // Remove the event listener when the component unmounts
      };
    }
  }, [isFocused]);

  const loadStories = async () => {
    try {
      const storedStories = await AsyncStorage.getItem('stories');
      if (storedStories !== null) {
        setFirstCardText(JSON.parse(storedStories));
      }
    } catch (error) {
      console.error('Error loading stories:', error);
    }
  };

  // Function to handle category press 
  const handleCategoryPress = (category) => {
    navigation.navigate('StorySectionScreen', { category, firstCardText });
  };

  const [categoryItems, setCategoryItems] = useState({});
  const updateCategoryItems = (category, itemCount) => {
    setCategoryItems((prevItems) => ({
      ...prevItems,
      [category]: itemCount,
    }));
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Daily Dose of Wisdom"
        leftIconName="bars"
        onLeftIconPress={() => navigation.navigate('ProfileScreen')}
      />
      <ScrollView style={styles.CategoriesContainer}>
        <View style={styles.categoryRow}>
          <TouchableOpacity onPress={() => handleCategoryPress('Stories', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/bookimage.jpg')}
              heading="Stories"
              subheading={`${firstCardText['Stories'] ? firstCardText['Stories'].length : 0} Items`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress('Nature', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/nautre.jpg')}
              heading="Nature"
              subheading={`${firstCardText['Nature'] ? firstCardText['Nature'].length : 0} Items`}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          <TouchableOpacity onPress={() => handleCategoryPress('Love', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/love.jpg')}
              heading="Love"
              subheading={`${firstCardText['Love'] ? firstCardText['Love'].length : 0} Items`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress('Happiness', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/happy.jpg')}
              heading="Happiness"
              subheading={`${firstCardText['Happiness'] ? firstCardText['Happiness'].length : 0} Items`}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          <TouchableOpacity onPress={() => handleCategoryPress('Friendship', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/friends.jpg')}
              heading="Friendship"
              subheading={`${firstCardText['Friendship'] ? firstCardText['Friendship'].length : 0} Items`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress('Personality', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/Personality.jpg')}
              heading="Personality"
              subheading={`${firstCardText['Personality'] ? firstCardText['Personality'].length : 0} Items`}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          <TouchableOpacity onPress={() => handleCategoryPress('Poetry', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/poetryimage.jpg')}
              heading="Poetry"
              subheading={`${firstCardText['Poetry'] ? firstCardText['Poetry'].length : 0} Items`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress('Science', updateCategoryItems)}>
            <Categories
              backgroundImage={require('../images/scienceimg.jpg')}
              heading="Science"
              subheading={`${firstCardText['Science'] ? firstCardText['Science'].length : 0} Items`}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001238',
  },
  CategoriesContainer: {
    padding: 10,
    marginTop: 80,
    marginBottom: 80,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default HomeScreen;
