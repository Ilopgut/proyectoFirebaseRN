import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FIREBASE_APP, FIREBASE_ANALYTICS } from '../firebase/firebaseConfig'; // Asegúrate de usar la ruta correcta


export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <StatusBar style="auto" />
    </View>
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
