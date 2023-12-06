import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AnswerCardProps {
  answer: string;
  checkIcon?: boolean | null;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, checkIcon }) => {
  return (
    <View
      style={[
        styles.card,
        {
          borderColor:
            checkIcon === true ? '#3eb8d4' : checkIcon === false ? 'red' : '#F0F0F0', // Dynamic border color
          backgroundColor:
            checkIcon === true ? '#dcf8ff' : checkIcon === false ? 'mistyrose' : 'white', // Dynamic background color
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.answer,
            {
              color:
                checkIcon === true
                  ? '#3eb8d4' // Dynamic text color when boolean is true
                  : checkIcon === false
                  ? 'red' // Dynamic text color when boolean is false
                  : 'gray', // Default text color when checkIcon is null or undefined
            },
          ]}
        >
          {answer}
        </Text>
      </View>
      {checkIcon !== undefined && (
        <View style={styles.checkIcon}>
          <CheckIcon
            style={styles.icon}
            name={
              checkIcon
                ? 'check-circle' // Check-circle when boolean is true
                : checkIcon === false
                ? 'close-circle' // Checkbox-blank-circle-outline when boolean is false
                : 'checkbox-blank-circle-outline' // Default to 'checkbox-blank-circle-outline' if checkIcon is null or undefined
            }
            size={20}
            color={
              checkIcon
                ? '#3eb8d4' // #3eb8d4 when boolean is true
                : checkIcon === false
                ? 'red' // red when boolean is false
                : '#F0F0F0' // Default to 'gray' if checkIcon is null or undefined
                
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    overflow: 'hidden',
    paddingLeft: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  answer: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkIcon: {
    marginEnd: 20,
  },
  icon: {},
});

export default AnswerCard;
