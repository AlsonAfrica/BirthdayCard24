import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import icon from "../assets/splash.png";
import { Platform } from 'react-native';

export default function HomeScreen({ navigation }) {
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const ButtonGradient = ({ onPress, colors, children }) => (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#999190', '#999190', '#999190']}
      style={styles.container}
    >
      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}>
        <View style={styles.logoContainer}>
          <Image
            source={Platform.select({
              ios: icon,
              android: icon
            })}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Birthday Card Maker</Text>
        <Text style={styles.subtitle}>Create memorable wishes</Text>

        <ButtonGradient
          onPress={() => navigation.navigate('CreateCard')}
          colors={['#8D8988', '#8D8988']}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>✨</Text>
            <Text style={styles.buttonText}>Create New Card</Text>
          </View>
        </ButtonGradient>

        <ButtonGradient
          onPress={() => navigation.navigate('SavedCards')}
          colors={['#8D8988','#8D8988']}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>📚</Text>
            <Text style={styles.buttonText}>View Saved Cards</Text>
          </View>
        </ButtonGradient>
      </Animated.View>
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 40,
    opacity: 0.8,
  },
  buttonContainer: {
    width: width * 0.8,
    height: 60,
    marginVertical: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    flex: 1,
    borderRadius: 30,
    padding: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});