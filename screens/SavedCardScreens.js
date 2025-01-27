import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { getSavedCards, deleteCard } from '../utils/storage';
import CardPreview from '../components/CardPreview';

export default function SavedCardsScreen({ navigation }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();

    // Refresh cards when screen comes into focus
    const unsubscribe = navigation.addListener('focus', loadCards);
    return unsubscribe;
  }, [navigation]);

  const loadCards = async () => {
    const savedCards = await getSavedCards();
    setCards(savedCards.reverse()); // Show newest first
  };

  const handleDelete = async (cardId) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteCard(cardId);
            if (success) {
              Alert.alert('Success', 'Card deleted successfully!');
              loadCards(); // Refresh the card list
            } else {
              Alert.alert('Error', 'Failed to delete the card');
            }
          },
        },
      ]
    );
  };

  const handleShare = async (card) => {
    try {
      const result = await Share.share({
        message: `Check out this card I created: ${card.title}\n${card.description}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with specific activity
          console.log('Shared with activity:', result.activityType);
        } else {
          // Shared
          Alert.alert('Success', 'Card shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the card');
    }
  };

  if (cards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No saved cards yet</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateCard')}
        >
          <Text style={styles.createButtonText}>Create Your First Card</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={styles.cardContainer}
          onLongPress={() => handleDelete(card.id)} // Long press to delete
        >
          <Text style={styles.dateText}>
            Created: {new Date(card.createdAt).toLocaleDateString()}
          </Text>
          <CardPreview {...card} />
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => handleShare(card)}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    color: '#666',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
