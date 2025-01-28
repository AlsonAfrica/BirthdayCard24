import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreens';
import CreateCardScreen from './screens/CreateCardScreens';
import SavedCardsScreen from './screens/SavedCardScreens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"  options={{ headerShown: false }}  component={HomeScreen}  />
        <Stack.Screen name="CreateCard" component={CreateCardScreen} />
        <Stack.Screen name="SavedCards" component={SavedCardsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
