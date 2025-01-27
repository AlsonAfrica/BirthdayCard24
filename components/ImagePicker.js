import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BACKGROUND_IMAGES = [
  { id: 1, source: require('../assets/cake.jpg'), thumbnail: require('../assets/cake.jpg') },
  { id: 2, source: require('../assets/gifts.jpg'), thumbnail: require('../assets/gifts.jpg') },
  { id: 3, source: require('../assets/confetti.jpg'), thumbnail: require('../assets/confetti.jpg') },
  { id: 4, source: require('../assets/surprise.jpg'), thumbnail: require('../assets/surprise.jpg') },
  { id: 5, source: require('../assets/party.jpg'), thumbnail: require('../assets/party.jpg') }
];

export default function ImagePicker({ selectedImageId, onImageSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {BACKGROUND_IMAGES.map((image) => (
          <TouchableOpacity
            key={image.id}
            style={[
              styles.imageBox,
              selectedImageId === image.id && styles.selected,
            ]}
            onPress={() => onImageSelect(image.id)}
          >
            <Image
              source={image.thumbnail}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  imageBox: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  selected: {
    borderColor: '#007AFF',
    borderWidth: 3,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});