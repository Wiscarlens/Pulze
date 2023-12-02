import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import SquareCard from '../components/SquareCard';
import ReactangleCard from '../components/RectangleCard';

const Welcome = () => {
  const [name, setName] = useState('Joe');

  const profileImage = require('../assets/profile.png');
  const flashcard = require('../assets/flash-card.png');
  const handbook = require('../assets/handbook.png');
  
  return (
  
    <View style={styles.container}>
        <View style={styles.row}>
          <Image source={profileImage} style={styles.profileImage} />
          <View>
            <Text style={styles.greeting}>Hi, {name}</Text>
            <Text >What do you want to learn today?</Text>
          </View>
        </View>

        <View style={styles.card}>
          <ReactangleCard
              imageSource={flashcard}
              namePart="Flash Card"
              category="200 Questions"
            />

            <ReactangleCard
              imageSource={handbook}
              namePart="Handbook"
              category="DMV"
            />
          
        </View>

        <Text style={styles.quiz}>Quiz</Text>

        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.cardsContainer}>
          <SquareCard
            imageSource={require('../assets/mergin_traffic.png')}
            title="Road Sign"
            subtitle="10 Questions"
          />

          <SquareCard
            imageSource={require('../assets/stop_sign.png')}
            title="Traffic Signal"
            subtitle="20 Questions"
          />

          <SquareCard
            imageSource={require('../assets/divided_highway.jpg')}
            title="Pavement Markings"
            subtitle="50 Questions"
          />

          <SquareCard
            imageSource={require('../assets/right_of_way.png')}
            title="Right-of-way rules"
            subtitle="50 Questions"
          />

          <SquareCard
            imageSource={require('../assets/driving-In-Bad-Weather.jpg')}
            title="Safe Driving Practices"
            subtitle="50 Questions"
          />

          <SquareCard
            imageSource={require('../assets/hazard.webp')}
            title="Hazards"
            subtitle="50 Questions"
          />

          <SquareCard
            imageSource={require('../assets/situational_awareness.jpeg')}
            title="Situational Awareness"
            subtitle="50 Questions"
          />
          </View>
        </ScrollView>
        
        
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginStart: 30,
    marginEnd: 30
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, 
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  quiz: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20
  },
  card: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3, // Android elevation for shadow
    shadowColor: 'black', // iOS shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    overflow: 'hidden', // Clip the border radius overflow
    padding: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});



export default Welcome;

