import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCard = async (card) => {
  try {
    const existingCards = await AsyncStorage.getItem('savedCards');
    const cards = existingCards ? JSON.parse(existingCards) : [];
    cards.push({
      ...card,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    await AsyncStorage.setItem('savedCards', JSON.stringify(cards));
    return true;
  } catch (error) {
    console.error('Error saving card:', error);
    return false;
  }
};

export const getSavedCards = async () => {
  try {
    const cards = await AsyncStorage.getItem('savedCards');
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error getting saved cards:', error);
    return [];
  }
};

export const deleteCard = async (cardId) => {
  try {
    const existingCards = await AsyncStorage.getItem('savedCards');
    const cards = existingCards ? JSON.parse(existingCards) : [];
    const updatedCards = cards.filter((card) => card.id !== cardId);
    await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
    return true;
  } catch (error) {
    console.error('Error deleting card:', error);
    return false;
  }
};