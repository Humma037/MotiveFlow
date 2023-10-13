import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TextInput } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import SmallButton from '../components/SmallButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorySectionScreen = ({ route }) => {
  const { category } = route.params;
  const [isCard2Visible, setIsCard2Visible] = useState(false);
  const [secondCardText, setSecondCardText] = useState('');
  const [firstCardText, setFirstCardText] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCards, setLikedCards] = useState({});
  const navigation = useNavigation();
  const translateY1 = new Animated.Value(0);

  useEffect(() => {
    loadStories();
    loadLikedCards();
  }, [category]);

  useEffect(() => {
    saveStories(firstCardText);
    saveLikedCards();
  }, [firstCardText, likedCards]);

  const [likedStoryCards, setLikedStoryCards] = useState([]);

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

  const saveStories = async (stories) => {
    try {
      await AsyncStorage.setItem('stories', JSON.stringify(stories));
    } catch (error) {
      console.error('Error saving stories:', error);
    }
  };

  const loadLikedCards = async () => {
    try {
      const likedCardsData = await AsyncStorage.getItem('likedCards');
      if (likedCardsData !== null) {
        setLikedCards(JSON.parse(likedCardsData));
      }
    } catch (error) {
      console.error('Error loading liked cards:', error);
    }
  };

  const saveLikedCards = async () => {
    try {
      await AsyncStorage.setItem('likedCards', JSON.stringify(likedCards));
    } catch (error) {
      console.error('Error saving liked cards:', error);
    }
  };

  const handleLeftIconPress = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleAddAnotherStoryPress = () => {
    setIsCard2Visible(!isCard2Visible);
  };

  const handleSecondCardTextChange = (text) => {
    setSecondCardText(text);
  };

  const handleDonePress = () => {
    if (secondCardText.trim() !== '') {
      const updatedStories = { ...firstCardText };
      updatedStories[category] = [...(updatedStories[category] || []), secondCardText];
      setFirstCardText(updatedStories);
      setSecondCardText('');
      setIsCard2Visible(false);
      setCurrentIndex(updatedStories[category].length - 1);
    }
  };

  const handleDeletePress = () => {
    if (currentIndex >= 0 && firstCardText[category]) {
      const updatedStories = { ...firstCardText };
      updatedStories[category].splice(currentIndex, 1);
      setFirstCardText(updatedStories);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePreviousPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextPress = () => {
    if (firstCardText[category] && currentIndex < firstCardText[category].length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLikePress = () => {
    const updatedLikedCards = { ...likedCards };
    if (updatedLikedCards[category] && updatedLikedCards[category][currentIndex]) {
      updatedLikedCards[category][currentIndex] = false;
      // Remove the card from the likedStoryCards list
      setLikedStoryCards(likedStoryCards.filter((card, index) => index !== currentIndex));
    } else {
      if (!updatedLikedCards[category]) {
        updatedLikedCards[category] = [];
      }
      updatedLikedCards[category][currentIndex] = true;
      // Add the card to the likedStoryCards list
      setLikedStoryCards([...likedStoryCards, firstCardText[category][currentIndex]]);
    }
    setLikedCards(updatedLikedCards);
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader
        title="Daily Dose of Wisdom"
        leftIconName="bars"
        onLeftIconPress={handleLeftIconPress}
      />
      {isCard2Visible && (
        <View style={styles.card2Container}>
          <View style={styles.card2}>
            <TextInput
              style={[styles.card2TextArea, { borderColor: 'gray', borderWidth: 1, color: '#001238' }]}
              multiline={true}
              editable={true}
              placeholder="Write your text here"
              placeholderTextColor="gray"
              value={secondCardText}
              onChangeText={handleSecondCardTextChange}
              textAlignVertical="top"
            />
            <SmallButton
              title="Save"
              onPress={handleDonePress}
              style={styles.doneButton}
            />
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add Story"
          onPress={handleAddAnotherStoryPress}
          iconName={isCard2Visible ? 'minus' : 'plus'}
          style={styles.addAnotherStoryButton}
        />
      </View>
      <Animated.View
        style={[
          styles.cardContainer,
          { transform: [{ translateY: translateY1 }] },
        ]}
      >
        <View style={styles.card}>
          <Text style={styles.cardText}>
            {firstCardText[category] && firstCardText[category].length > 0
              ? firstCardText[category][currentIndex]
              : 'No stories available.'}
          </Text>
        </View>
        <View style={styles.cardFooter}>
            <Text style={styles.cardNumberText}>
              {currentIndex + 1}/{firstCardText[category] ? firstCardText[category].length : 0}
            </Text>
            <TouchableOpacity onPress={handleLikePress}>
              <Icon
                name="heart"
                size={25}
                color={likedCards[category] && likedCards[category][currentIndex] ? 'red' : '#F6F5D7'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePress}>
              <Icon name="delete" size={25} color="#F6F5D7" />
            </TouchableOpacity>
          </View>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={handlePreviousPress}>
            <Icon name="arrowleft" size={25} color="#F6F5D7" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPress}>
            <Icon name="arrowright" size={25} color="#F6F5D7" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001238',
  },
  addAnotherStoryButton: {
    backgroundColor: '#3399ff',
    marginTop: 20,
    marginLeft: 40,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    width: 350,
    height: 430,
    backgroundColor: '#001f48',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    alignItems: 'center',
    position: 'relative',
  },
  cardText: {
    fontSize: 16,
    color: '#F6F5D7',
    textAlign: 'justify',
    padding: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '91%',
    alignItems: 'center',
    backgroundColor: '#001f48',
    padding:17,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  cardNumberText: {
    fontSize: 16,
    color: '#F6F5D7',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
  },
  card2Container: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  card2: {
    width: 350,
    backgroundColor: '#001f48',
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    marginTop: 80,
  },
  card2TextArea: {
    width: '100%',
    backgroundColor: '#F6F5D7',
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 150,
  },
});

export default StorySectionScreen;
