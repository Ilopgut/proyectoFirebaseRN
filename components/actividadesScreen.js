import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FIREBASE_APP, FIREBASE_ANALYTICS, FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebaseConfig'; // Asegúrate de usar la ruta correcta
import {doc,setDoc,serverTimestamp,addDoc,query, collection, onSnapshot} from 'firebase/firestore';

export default function actividadesScreen() {
    const userId = FIREBASE_AUTH.currentUser?.uid;

    const q = query(collection(FIRESTORE_DB, "actividades"))


    if (!userId) {
          console.log('Usuario no autenticado');
          return;
    }

//     añadir actividad a la coleccion

//     const nuevaActividad = {
//         userId,
//         titulo: "Excursión",
//         descripcion: "Rocódromo el martes que viene",
//         fecha: new Date().toISOString(),
//     };

//     addDoc(collection(FIRESTORE_DB, 'actividades'), nuevaActividad);

  return (
    <View style={styles.container}>
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
