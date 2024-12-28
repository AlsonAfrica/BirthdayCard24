import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ViewCardScreen({ route }) {
  const { cardText, image } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Birthday Card</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.cardText}>{cardText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
