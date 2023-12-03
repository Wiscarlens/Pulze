import React from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface QuestionCardProps {
  imageSource?: ImageSourcePropType;
  title: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ imageSource, title: question}) => {
  return (
    <View style={styles.card}>
      {imageSource && <Image source={imageSource} style={styles.cardImage} />}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{question}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '40%',
    height: '40%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: 'gray',
  },
});

export default QuestionCard;
