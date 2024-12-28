import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateCardScreen from './screens/CreateCardScreen';
import ViewCardScreen from './screens/ViewCardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateCard">
        <Stack.Screen name="CreateCard" component={CreateCardScreen} />
        <Stack.Screen name="ViewCard" component={ViewCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
