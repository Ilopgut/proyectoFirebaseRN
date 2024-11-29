import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,renderItem } from 'react-native';
import { FIREBASE_APP, FIREBASE_ANALYTICS, FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebaseConfig'; // Asegúrate de usar la ruta correcta
import {doc,setDoc,serverTimestamp,addDoc,query, collection, onSnapshot,getDocs, deleteDoc} from 'firebase/firestore';

import { useState,useEffect } from 'react';

export default function actividadesScreen() {
    const userId = FIREBASE_AUTH.currentUser?.uid;
    const [actividades,setActividades] = useState([]);

    if (!userId) {
      console.log("Usuario no autenticado");
      return; // Si no hay usuario autenticado, no hacemos nada
    }

    const nuevaActividad = {
        userId,
        titulo: "Excursión",
        descripcion: "Rocódromo el martes que viene",
        fecha: new Date().toISOString(),
    };

    addDoc(collection(FIRESTORE_DB, 'actividades'), nuevaActividad);

// Función para vaciar una colección
async function vaciarColeccion(nombreColeccion) {
  // Obtener la referencia a la colección
  const coleccionRef = collection(FIRESTORE_DB, nombreColeccion);

  try {
    // Obtener todos los documentos en la colección
    const querySnapshot = await getDocs(coleccionRef);

    // Usar un for...of para iterar sobre cada documento de manera asincrónica
    for (const documento of querySnapshot.docs) {
      // Eliminar el documento individualmente
      await deleteDoc(doc(FIRESTORE_DB, nombreColeccion, documento.id));
      console.log(`Documento con ID ${documento.id} eliminado.`);
    }

    console.log(`La colección ${nombreColeccion} ha sido vaciada.`);
  } catch (error) {
    console.error("Error al vaciar la colección:", error);
  }
}

// Llamar a la función para vaciar una colección (por ejemplo, "actividades")
//vaciarColeccion("actividades");


  return (
    <View style={styles.container}>
        <FlatList
          data={actividades}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>No hay actividades disponibles.</Text>}
        />
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
