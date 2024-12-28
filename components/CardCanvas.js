import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function CardCanvas({ 
  text, 
  image, 
  fontSize, 
  textColor, 
  textAlign, 
  selectedDecoration 
}) {
  const [zoomImage, setZoomImage] = useState(false);

  const renderBackground = () => {
    if (image) {
      return (
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => setZoomImage(!zoomImage)}
          style={styles.imageContainer}
        >
          <Image 
            source={{ uri: image }} 
            style={[
              styles.backgroundImage,
              zoomImage && styles.zoomedImage
            ]} 
            resizeMode={zoomImage ? 'contain' : 'cover'}
          />
        </TouchableOpacity>
      );
    }
    
    return (
      <LinearGradient
        colors={['#f6d365', '#fda085']}
        style={styles.gradientBackground}
      />
    );
  };

  const renderTextOverlay = () => {
    if (!text) {
      return (
        <Text style={styles.placeholderText}>
          Your Birthday Message Here
        </Text>
      );
    }

    return (
      <BlurView 
        intensity={Platform.OS === 'ios' ? 50 : 30} 
        style={styles.blurContainer}
      >
        <Text 
          style={[
            styles.cardText, 
            { 
              fontSize, 
              color: textColor, 
              textAlign 
            }
          ]}
        >
          {text}
        </Text>
      </BlurView>
    );
  };

  const renderDecoration = () => {
    if (!selectedDecoration) return null;

    return (
      <View style={styles.decorationContainer}>
        <Image 
          source={{ uri: selectedDecoration }} 
          style={styles.decoration} 
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {renderBackground()}
        
        <View style={styles.overlay}>
          {renderTextOverlay()}
          {renderDecoration()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    aspectRatio: 0.7,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  zoomedImage: {
    alignSelf: 'center',
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 1000,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  blurContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    padding: 15,
    width: '90%',
    alignItems: 'center',
  },
  cardText: {
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  placeholderText: {
    fontSize: 18,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  decorationContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    padding: 10,
  },
  decoration: {
    width: 70,
    height: 70,
  },
});