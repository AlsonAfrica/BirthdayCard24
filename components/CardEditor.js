import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import ImagePicker from './ImagePicker';
import ColorPicker from './ColorPicker';

export default function CardEditor({ onUpdate }) {
  const [message, setMessage] = useState('');
  const [backgroundImageId, setBackgroundImageId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [activeBackground, setActiveBackground] = useState('color'); // 'color' or 'image'
  // New state for font customization
  const [fontColor, setFontColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState('normal'); // 'normal', 'italic'
  const [fontWeight, setFontWeight] = useState('normal'); // 'normal', 'bold'

  const fontSizeOptions = [12, 14, 16, 18, 20, 24, 28, 32];

  const updateCard = (updates = {}) => {
    const newState = {
      message: updates.message ?? message,
      backgroundImageId: updates.backgroundImageId ?? backgroundImageId,
      backgroundColor: updates.backgroundColor ?? backgroundColor,
      activeBackground: updates.activeBackground ?? activeBackground,
      fontColor: updates.fontColor ?? fontColor,
      fontSize: updates.fontSize ?? fontSize,
      fontStyle: updates.fontStyle ?? fontStyle,
      fontWeight: updates.fontWeight ?? fontWeight,
    };

    // Update all state
    setMessage(newState.message);
    setBackgroundImageId(newState.backgroundImageId);
    setBackgroundColor(newState.backgroundColor);
    setActiveBackground(newState.activeBackground);
    setFontColor(newState.fontColor);
    setFontSize(newState.fontSize);
    setFontStyle(newState.fontStyle);
    setFontWeight(newState.fontWeight);

    // Send updates to parent
    onUpdate({
      message: newState.message,
      backgroundImageId: newState.activeBackground === 'image' ? newState.backgroundImageId : null,
      backgroundColor: newState.activeBackground === 'color' ? newState.backgroundColor : null,
      activeBackground: newState.activeBackground,
      fontColor: newState.fontColor,
      fontSize: newState.fontSize,
      fontStyle: newState.fontStyle,
      fontWeight: newState.fontWeight,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            color: fontColor,
            fontSize: fontSize,
            fontStyle: fontStyle,
            fontWeight: fontWeight,
          },
        ]}
        multiline
        placeholder="Enter your birthday message..."
        value={message}
        onChangeText={(text) => updateCard({ message: text })}
      />

      {/* Font Customization Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Settings</Text>
        
        {/* Font Color Picker */}
        <Text style={styles.label}>Font Color</Text>
        <ColorPicker
          selectedColor={fontColor}
          onColorSelect={(color) => updateCard({ fontColor: color })}
        />

        {/* Font Size Selector */}
        <Text style={styles.label}>Font Size</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fontSizeContainer}>
          {fontSizeOptions.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.fontSizeButton,
                fontSize === size && styles.activeFontSize,
              ]}
              onPress={() => updateCard({ fontSize: size })}
            >
              <Text style={[
                styles.fontSizeText,
                fontSize === size && styles.activeFontSizeText,
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Font Style Controls */}
        <View style={styles.fontControlsContainer}>
          <TouchableOpacity
            style={[
              styles.styleButton,
              fontStyle === 'italic' && styles.activeStyle,
            ]}
            onPress={() => updateCard({ fontStyle: fontStyle === 'italic' ? 'normal' : 'italic' })}
          >
            <Text style={[
              styles.styleButtonText,
              fontStyle === 'italic' && styles.activeStyleText,
            ]}>Italic</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.styleButton,
              fontWeight === 'bold' && styles.activeStyle,
            ]}
            onPress={() => updateCard({ fontWeight: fontWeight === 'bold' ? 'normal' : 'bold' })}
          >
            <Text style={[
              styles.styleButtonText,
              fontWeight === 'bold' && styles.activeStyleText,
            ]}>Bold</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Background Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Background Settings</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeBackground === 'color' && styles.activeToggle,
            ]}
            onPress={() => updateCard({ activeBackground: 'color' })}
          >
            <Text style={[
              styles.toggleText,
              activeBackground === 'color' && styles.activeToggleText,
            ]}>Color</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeBackground === 'image' && styles.activeToggle,
            ]}
            onPress={() => updateCard({ activeBackground: 'image' })}
          >
            <Text style={[
              styles.toggleText,
              activeBackground === 'image' && styles.activeToggleText,
            ]}>Image</Text>
          </TouchableOpacity>
        </View>

        {activeBackground === 'image' ? (
          <ImagePicker
            selectedImageId={backgroundImageId}
            onImageSelect={(imageId) => updateCard({ backgroundImageId: imageId })}
          />
        ) : (
          <ColorPicker
            selectedColor={backgroundColor}
            onColorSelect={(color) => updateCard({ backgroundColor: color })}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 100,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeToggle: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  fontSizeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  fontSizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  activeFontSize: {
    backgroundColor: '#007AFF',
  },
  fontSizeText: {
    color: '#007AFF',
  },
  activeFontSizeText: {
    color: '#FFFFFF',
  },
  fontControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  styleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  activeStyle: {
    backgroundColor: '#007AFF',
  },
  styleButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  activeStyleText: {
    color: '#FFFFFF',
  },
});