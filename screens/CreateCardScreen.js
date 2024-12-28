import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Platform,
  Alert,
  Dimensions, 
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import CardCanvas from '../components/CardCanvas';

// Sample decorations with a more diverse set
const DECORATIONS = [
  { id: '1', uri: 'https://example.com/balloon.png', name: 'Balloons' },
  { id: '2', uri: 'https://example.com/cake.png', name: 'Cake' },
  { id: '3', uri: 'https://example.com/candle.png', name: 'Candles' },
  { id: '4', uri: 'https://example.com/confetti.png', name: 'Confetti' },
  { id: '5', uri: 'https://example.com/gift.png', name: 'Gift' },
];

const { width } = Dimensions.get('window');

export default function CreateCardScreen({ navigation }) {
  const [cardText, setCardText] = useState('');
  const [image, setImage] = useState(null);
  const [fontSize, setFontSize] = useState(18);
  const [textColor, setTextColor] = useState('#000');
  const [textAlign, setTextAlign] = useState('center');
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [decorations] = useState(DECORATIONS);

  // Improved image picking with error handling
  const pickImage = useCallback(async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Needed', 
          'Sorry, we need camera roll permissions to make this work!'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picking error:', error);
      Alert.alert('Error', 'Could not pick an image. Please try again.');
    }
  }, []);

  // Color palette for formatting
  const COLOR_PALETTE = [
    '#000000', 
    '#FF6347', 
    '#4A90E2', 
    '#2ECC71', 
    '#9B59B6'
  ];

  const handleColorChange = () => {
    const currentIndex = COLOR_PALETTE.indexOf(textColor);
    const nextIndex = (currentIndex + 1) % COLOR_PALETTE.length;
    setTextColor(COLOR_PALETTE[nextIndex]);
  };

  const renderDecoration = useCallback(({ item }) => (
    <TouchableOpacity 
      onPress={() => setSelectedDecoration(item.uri)}
      style={[
        styles.decorationButton, 
        selectedDecoration === item.uri && styles.selectedDecoration
      ]}
    >
      <Image 
        source={{ uri: item.uri }} 
        style={styles.decorationImage} 
        resizeMode="contain"
      />
      <Text style={styles.decorationLabel}>{item.name}</Text>
    </TouchableOpacity>
  ), [selectedDecoration]);

  return (
    <ScrollView>
    <LinearGradient 
      colors={['#F5F7FA', '#B8C6DB']} 
      style={styles.container}
    >
      <Text style={styles.title}>Create Your Birthday Card</Text>
      
      <CardCanvas 
        text={cardText} 
        image={image} 
        fontSize={fontSize} 
        textColor={textColor} 
        textAlign={textAlign}
        selectedDecoration={selectedDecoration}
      />

      <View style={styles.controlSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter your birthday message"
          placeholderTextColor="#888"
          value={cardText}
          onChangeText={setCardText}
          multiline
          maxLength={200}
        />

        <TouchableOpacity 
          style={styles.imagePickerButton} 
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>
            {image ? 'Change Image' : 'Pick an Image'}
          </Text>
        </TouchableOpacity>

        <View style={styles.formattingControls}>
          <TouchableOpacity 
            onPress={() => setFontSize(prev => Math.min(prev + 2, 36))} 
            style={styles.formatButton}
          >
            <Text style={styles.formatButtonText}>A+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setFontSize(prev => Math.max(prev - 2, 12))} 
            style={styles.formatButton}
          >
            <Text style={styles.formatButtonText}>A-</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleColorChange} 
            style={styles.formatButton}
          >
            <Text style={styles.formatButtonText}>Color</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setTextAlign(prev => prev === 'center' ? 'left' : 'center')} 
            style={styles.formatButton}
          >
            <Text style={styles.formatButtonText}>Align</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Choose a Decoration:</Text>
        <FlatList
          data={decorations}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderDecoration}
          contentContainerStyle={styles.decorationList}
        />

        <TouchableOpacity 
          style={styles.previewButton}
          onPress={() => navigation.navigate('ViewCard', { 
            cardText, 
            image, 
            fontSize, 
            textColor, 
            textAlign, 
            selectedDecoration 
          })}
        >
          <Text style={styles.previewButtonText}>Preview Card</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  controlSection: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  formattingControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  formatButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    width: '22%',
    alignItems: 'center',
  },
  formatButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  decorationList: {
    alignSelf: 'center',
  },
  decorationButton: {
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 5,
  },
  selectedDecoration: {
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 10,
  },
  decorationImage: {
    width: 70,
    height: 70,
  },
  decorationLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  previewButton: {
    backgroundColor: '#2ECC71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  previewButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

