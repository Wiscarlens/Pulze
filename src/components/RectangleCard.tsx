import React from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface RectangleCardProps {
  imageSource: ImageSourcePropType;
  namePart: string;
  category: string;
}

const RectangleCard: React.FC<RectangleCardProps> = ({ imageSource, namePart, category }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.namePart}>{namePart}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 60,
    flexDirection: 'row',
    
  },
  imageContainer: {
    width: 40,
    height: 40,
    overflow: 'hidden', // Clip the border radius overflow
    marginEnd: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  namePart: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 8,
    color: 'gray',
  },
});

export default RectangleCard;
