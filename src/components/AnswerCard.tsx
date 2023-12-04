import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckIcon from 'react-native-vector-icons/FontAwesome';

interface AnswerCardProps {
  answer: string;
  checkIcon?: boolean;
}

// const AnswerCard: React.FC<AnswerCardProps> = ({ answer, checkIcon = false}) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.textContainer}>
//         <Text style={styles.answer}>{answer}</Text>
//       </View>
//       {checkIcon && (
//         <View style={styles.checkIcon}>
//           <CheckIcon
//             style={styles.icon}
//             name={checkIcon ? 'checkcircle' : 'circle-o'}
//             size={20}
//             color={'#3eb8d4'}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, checkIcon = false }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.answer}>{answer}</Text>
      </View>
      {checkIcon !== undefined && (
        <View style={styles.checkIcon}>
          <CheckIcon
            style={styles.icon}
            name={checkIcon ? 'checkcircle' : 'circleo'} // Default to 'circleo' if checkIcon is not provided
            size={20}
            color={'#3eb8d4'}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#dcf8ff',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    overflow: 'hidden',
    paddingLeft: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3eb8d4',
  },
  textContainer: {
    flex: 1,
  },
  answer: {
    color: '#3eb8d4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkIcon: {
    marginEnd: 20,
  },
  icon: {},
});

export default AnswerCard;
