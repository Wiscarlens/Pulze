
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import QuestionCard from '../components/QuestionCard';
import AnswerCard from '../components/AnswerCard';
import { ProgressBar } from 'react-native-paper';

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
          <View>
            <ProgressBar
              progress={0.1}
              color="#D94B3A"
              style={styles.progressBar}
            />
          </View>
          <View>
            <Text style={styles.progressText}>1/10</Text>
          </View>
        </View>
      </View>
      
        <QuestionCard
            title={questions[currentQuestionIndex].question}
        />

        {questions[currentQuestionIndex].choices.map((choice, index) => (
          <AnswerCard
              key={index}
              answer={choice}
              checkIcon={null}
          />
        ))}

      {/* Navigation Buttons */}
      {/* <View style={styles.navigationButtons}>
        <Button title="Previous" onPress={handlePrevious} />
        <Button title="Next" onPress={handleNext} />
      </View> */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'flex-end',
    
  },
  progressText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D94B3A',
    marginEnd: 15,

  },
  button: {
    backgroundColor: '#D94B3A',
    width: '100%',
    height: 50,
    borderRadius: 15,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center', 
  
  },
  buttonText: {
    color: 'white',
   fontWeight: 'bold' 
  },
});

export default QuizScreen;
