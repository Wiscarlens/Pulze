import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

interface ProgressCardProps {
  currentQuestionIndex: number;
  questionsLength: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  questionsLength,
  currentQuestionIndex,
}) => {
  const progressValue = currentQuestionIndex + 1 / questionsLength;

  return (
    <View>
      <View style={styles.progressCardContainer}>
        <View style={styles.progressCard}>
          <ProgressBar
            progress={progressValue}
            color={'#D94B3A'}
            style={styles.progressBar}
          />
        </View>
        <View style={styles.currentQuestion}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{questionsLength}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressCardContainer: {
    height: 25,
    width: 300,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCard: {
    flex: 7,
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
    width: '90%',
    marginStart: 15,
  },
  progressText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D94B3A',
  },
  currentQuestion: {
    flex: 1,
  },
});

export default ProgressCard;
