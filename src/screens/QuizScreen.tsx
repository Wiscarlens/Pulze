
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import QuestionCard from '../components/QuestionCard';

const QuizScreen = () => {
  const questions = [
    {
      question: 'If your engine dies as you driving on a curve, you should?',
      choices: [
        'Try to start the engine on the road', 
        'Pull over to the right side of the road', 
        'Hold your streering wheel tightly and keep your vehicle going straight', 
        'Ease off the gas Pedal'
      ],
    },
    {
      question: 'What is the capital of Germany?',
      choices: ['New York', 'Berlin', 'Mexico', 'Brazilia'],
    },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleClose = () => {
    // Handle closing the quiz (navigate back or perform any necessary action)
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.closeCard}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressCard}>
       
          {/* Progress Bar space */}
        </View>
      </View>
      
        <QuestionCard
            title={questions[currentQuestionIndex].question}
          />


      {/* Question Card */}
      {/* <Card containerStyle={styles.cardContainer}>
        <Card.Title>{questions[currentQuestionIndex].question}</Card.Title>
        {questions[currentQuestionIndex].choices.map((choice, index) => (
          <Button key={index} title={choice} type="outline" />
        ))}
      </Card> */}

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <Button title="Previous" onPress={handlePrevious} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginStart: 30,
    marginEnd: 30,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardContainer: {
    // Add any additional styling for the card container if needed
  },
  closeCard: {
    height: 25,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    marginEnd: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCard: {
    height: 25,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;
