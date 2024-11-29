import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';

import { FIREBASE_APP, FIREBASE_ANALYTICS, FIREBASE_AUTH,FIRESTORE_DB } from '../firebase/firebaseConfig'; // Asegúrate de usar la ruta correcta
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';

import {doc,setDoc,serverTimestamp} from 'firebase/firestore';
// Validation schema using Yup
const RegistroSchema = Yup.object().shape({
  usuario: Yup.string()
    .required('El nombre de usuario es obligatorio')
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede tener más de 20 caracteres'),
  correo: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es obligatorio'),
  contraseña: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(12, 'La contraseña debe tener máximo 12 caracteres')
    .required('La contraseña es obligatoria')
});

export default function Registro({ navigation }) {
    const [loading,setLoading] = useState();
    const [RegistroError,setRegistroError] = useState('');

    const handleSubmit = async (values) => {
      setLoading(true);
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          values.correo,
          values.contraseña
        );

        // Optional: Update profile with username
        await updateProfile(userCredential.user, {
          displayName: values.usuario
        });

        // Optional: Create user document in Firestore
        await setDoc(doc(FIRESTORE_DB, 'users', userCredential.user.uid), {
          username: values.usuario,
          email: values.correo,
          createdAt: serverTimestamp()
        });

        // Navigate to Actividades screen
        setRegistroError('');
        navigation.navigate('Actividades');
  } catch (error) {
        // Detailed error handling
        let errorMessage = 'Error al crear cuenta: ';

        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage += 'El correo electrónico ya está registrado';
            break;
          default:
            errorMessage = error.message;
        }

        // Set the error message in state
        setRegistroError(errorMessage);

        // Log the full error for debugging
        console.error('Registration Error:', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ usuario: '', correo: '', contraseña: '' }}
        validationSchema={RegistroSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Crear Cuenta</Text>

            {/* Campo de Usuario */}
            <TextInput
              style={[
                styles.input,
                (errors.usuario && touched.usuario) && styles.inputError
              ]}
              placeholder="Nombre de Usuario"
              onChangeText={handleChange('usuario')}
              onBlur={handleBlur('usuario')}
              value={values.usuario}
            />
            {errors.usuario && touched.usuario && (
              <Text style={styles.errorText}>{errors.usuario}</Text>
            )}

            {/* Campo de Correo */}
            <TextInput
              style={[
                styles.input,
                (errors.correo && touched.correo) && styles.inputError
              ]}
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              onChangeText={handleChange('correo')}
              onBlur={handleBlur('correo')}
              value={values.correo}
            />
            {errors.correo && touched.correo && (
              <Text style={styles.errorText}>{errors.correo}</Text>
            )}

            {/* Campo de Contraseña */}
            <TextInput
              style={[
                styles.input,
                (errors.contraseña && touched.contraseña) && styles.inputError
              ]}
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={handleChange('contraseña')}
              onBlur={handleBlur('contraseña')}
              value={values.contraseña}
            />
            {errors.contraseña && touched.contraseña && (
              <Text style={styles.errorText}>{errors.contraseña}</Text>
            )}

            {/* Botón de Registro */}
            <TouchableOpacity
              style={[
                styles.submitButton,
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Registrarse</Text>
            </TouchableOpacity>

            <Text style={styles.errorText}>{RegistroError}</Text>
            {/* Botón de Ir a Login */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.registerButtonText}>
                ¿Ya tienes cuenta? Inicia Sesión
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 15,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007bff',
    fontWeight: '600',
    fontSize: 14,
  },
});