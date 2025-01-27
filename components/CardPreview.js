import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const BACKGROUND_IMAGES = {
  1: require('../assets/gifts.jpg'),
  2: require('../assets/cake.jpg'),
  3: require('../assets/confetti.jpg'),
  4: require('../assets/surprise.jpg'),
  5: require('../assets/party.jpg'),
};

export default function CardPreview({ 
  message, 
  backgroundImageId, 
  backgroundColor, 
  activeBackground,
  // Add new font customization props
  fontColor,
  fontSize,
  fontStyle,
  fontWeight
}) {
  const renderContent = () => (
    <View style={[
      styles.overlay,
      { backgroundColor: activeBackground === 'color' ? 'transparent' : 'rgba(0, 0, 0, 0.3)' }
    ]}>
      <Text style={[
        styles.message,
        {
          // Apply font customizations
          color: activeBackground === 'color' 
            ? (fontColor || '#000000') 
            : (fontColor || '#FFFFFF'),
          fontSize: fontSize || 18,
          fontStyle: fontStyle || 'normal',
          fontWeight: fontWeight || 'normal',
          // Adjust text shadow based on background type and color
          textShadowColor: activeBackground === 'image' || isLightColor(fontColor) 
            ? 'rgba(0, 0, 0, 0.75)' 
            : 'transparent'
        }
      ]}>
        {message || 'Your birthday message will appear here'}
      </Text>
    </View>
  );

  if (activeBackground === 'image' && backgroundImageId && BACKGROUND_IMAGES[backgroundImageId]) {
    return (
      <ImageBackground
        source={BACKGROUND_IMAGES[backgroundImageId]}
        style={styles.card}
        imageStyle={styles.backgroundImage}
      >
        {renderContent()}
      </ImageBackground>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: backgroundColor || '#FFFFFF' }]}>
      {renderContent()}
    </View>
  );
}

// Helper function to determine if a color is light
const isLightColor = (color) => {
  if (!color) return false;
  
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window'),
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});