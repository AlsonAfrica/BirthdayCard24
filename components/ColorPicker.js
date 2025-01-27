import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71'
];

export default function ColorPicker({ selectedColor, onColorSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorBox,
              { backgroundColor: color },
              selectedColor === color && styles.selected,
            ]}
            onPress={() => onColorSelect(color)}
          />
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
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selected: {
    borderWidth: 3,
    borderColor: '#000',
  },
});
