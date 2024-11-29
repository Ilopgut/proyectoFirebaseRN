import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function ActividadesScreen() {
  const userId = FIREBASE_AUTH.currentUser?.uid;
  const [actividades, setActividades] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(FIRESTORE_DB, 'actividades'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const actividadesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActividades(actividadesData);
    });

    return () => unsubscribe();
  }, [userId]);

  const agregarActividad = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      const nuevaActividad = {
        userId,
        titulo,
        descripcion,
        fecha: new Date().toISOString(),
      };

      await addDoc(collection(FIRESTORE_DB, 'actividades'), nuevaActividad);

      setTitulo('');
      setDescripcion('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar la actividad');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.titulo}</Text>
      <Text>{item.descripcion}</Text>
      <Text style={styles.itemDate}>
        {new Date(item.fecha).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={actividades}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No hay actividades</Text>}
      />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={agregarActividad}
        >
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDate: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  formContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
  },
});