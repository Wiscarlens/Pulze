import React from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface SquareCardProps {
  imageSource: ImageSourcePropType;
  title: string;
  subtitle: string;
}

const SquareCard: React.FC<SquareCardProps> = ({ imageSource, title, subtitle }) => {
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 150,
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

export default SquareCard;
