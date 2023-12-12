import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import QuestionCard from '../components/QuestionCard';
import AnswerCard from '../components/AnswerCard';
import ProgressCard from '../components/ProgressCard';

const QuizScreen = () => {
  // const navigation = useNavigation();

  const questions = [
    {
      question: 'If your engine dies as you driving on a curve, you should?',
      choices: [
        'Try to start the engine on the road',
        'Pull over to the right side of the road',
        'Hold your steering wheel tightly and keep your vehicle going straight',
        'Ease off the gas Pedal',
      ],
      correctAnswerIndex: 3, // Index of the correct answer in the choices array
    },
    {
      question: 'What is the capital of Germany?',
      choices: [
        'New York', 
        'Berlin', 
        'Mexico', 
        'Brasilia'
      ],
      correctAnswerIndex: 1, // Index of the correct answer in the choices array
    },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [icon, setIcon] = useState<boolean | null>(null);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  
      resetStateInAnswerCards();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerPress = (selectedAnswerIndex: number) => {
    const isCorrect = selectedAnswerIndex === questions[currentQuestionIndex].correctAnswerIndex;

    // Log whether the selected answer is correct or wrong
    if (isCorrect) {
      console.log('Correct Answer!');
    } else {
      console.log('Wrong Answer!');
    }
  };

  const resetStateInAnswerCards = () => {
    setIcon(null); // Reset the state in parent component
  };


  const handleClose = () => {
    // navigation.goBack();
    // Handle closing the quiz (navigate back or perform any necessary action)
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.closeCard}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text>X</Text>
          </TouchableOpacity>
        </View >

        <ProgressCard
          questionsLength={questions.length}
          currentQuestionIndex={currentQuestionIndex}
        />
      </View>
      
        <QuestionCard
            title={questions[currentQuestionIndex].question}
        />

    {/* <AnswerCard
      key={0}
      answer={questions[currentQuestionIndex].choices[0]}
      isCorrect={ questions[currentQuestionIndex].correctAnswerIndex === 0 }
      onPress={() => handleAnswerPress(0)}
      resetState={resetStateInAnswerCards} 
    />

    <AnswerCard
      key={1}
      answer={questions[currentQuestionIndex].choices[1]}
      isCorrect={ questions[currentQuestionIndex].correctAnswerIndex === 1 }
      onPress={() => handleAnswerPress(1)}
      resetState={resetStateInAnswerCards} 
    />

    <AnswerCard
      key={2}
      answer={questions[currentQuestionIndex].choices[2]}
      isCorrect={ questions[currentQuestionIndex].correctAnswerIndex === 2 }
      onPress={() => handleAnswerPress(2)}
      resetState={resetStateInAnswerCards} 
    />

    <AnswerCard
      key={3}
      answer={questions[currentQuestionIndex].choices[3]}
      isCorrect={ questions[currentQuestionIndex].correctAnswerIndex === 3 }
      onPress={() => handleAnswerPress(3)}
      resetState={resetStateInAnswerCards} 
    /> */}
        

        {questions[currentQuestionIndex].choices.map((choice, index) => (
          <AnswerCard
              key={index}
              answer={choice}
              isCorrect={ questions[currentQuestionIndex].correctAnswerIndex === index }
              onPress={() => handleAnswerPress(index)}
              resetState={resetStateInAnswerCards} 
          />
        ))}

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
    height: 8,
    borderRadius: 10,
    width: '70%',
   
  },
  closeButton: {
    position: 'absolute',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
    height: 70,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D94B3A',
    marginEnd: 15,

  },
  currentQuestion: {
      
  },
  button: {
    backgroundColor: '#D94B3A',
    width: '100%',
    height: 50,
    borderRadius: 15,
    marginTop: 40,
    alignItems: 'center', 
    justifyContent: 'center',
  
  },
  buttonText: {
    color: 'white',
   fontWeight: 'bold' 
  },
});

export default QuizScreen;


