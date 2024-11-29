import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Login from './components/Login';
import actividadesScreen from './components/actividadesScreen';
import Registro from './components/Registro';

// Create Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4f4f4',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Iniciar Sesión',headerShown:false }}
          />
          <Stack.Screen
            name="Actividades"
            component={actividadesScreen}
            options={{ title: 'Mis Actividades'}}
          />
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{ title: 'Registrarse',headerShown:false  }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
