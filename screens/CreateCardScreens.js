import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardEditor from '../components/CardEditor';
import CardPreview from '../components/CardPreview';
import { saveCard } from '../utils/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreateCardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [cardData, setCardData] = useState({
    message: '',
    backgroundImageId: 1,
    fontColor: '#000000',
    fontSize: 18,
    fontStyle: 'normal',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveButtonAnim] = useState(new Animated.Value(1));

  const animateSaveButton = () => {
    Animated.sequence([
      Animated.timing(saveButtonAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(saveButtonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSave = async () => {
    if (!cardData.message.trim()) {
      Alert.alert('Missing Message', 'Please add a message to your card');
      return;
    }

    animateSaveButton();
    setIsSaving(true);

    const success = await saveCard(cardData);
    setIsSaving(false);

    if (success) {
      Alert.alert(
        '🎉 Card Saved!',
        'What would you like to do next?',
        [
          {
            text: 'View All Cards',
            onPress: () => navigation.navigate('SavedCards'),
          },
          {
            text: 'Create New Card',
            onPress: () => setCardData({ message: '', backgroundImageId: 1, fontColor: '#000000', fontSize: 18, fontStyle: 'normal' }),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Oops!',
        'Something went wrong while saving your card. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#999190', '#999190']} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Card</Text>
          <Text style={styles.subtitle}>Design something special</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.previewContainer}>
            <CardPreview {...cardData} />
          </View>

          <View style={styles.editorContainer}>
            <CardEditor onUpdate={setCardData} />
          </View>

          <Animated.View
            style={[
              styles.saveButtonContainer,
              { transform: [{ scale: saveButtonAnim }] },
            ]}
          >
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={isSaving}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#8D8988', '#8D8988']}
                style={styles.saveButtonGradient}
              >
                {isSaving ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Card</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999190',
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  previewContainer: {
    marginVertical: 20,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  editorContainer: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#8D8988',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonContainer: {
    marginTop: 32,
    marginBottom: 20,
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
