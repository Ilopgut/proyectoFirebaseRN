import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity } from 'react-native';
import { FIREBASE_APP, FIREBASE_ANALYTICS, FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebaseConfig'; // Asegúrate de usar la ruta correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';


// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  correo: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es obligatorio'),
  contraseña: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(12, 'La contraseña debe tener máximo 12 caracteres')
    .required('La contraseña es obligatoria')
});

export default function Login({ navigation }) {
    const [LoginError,setLoginError] = useState('');

    const handleSubmit = async (values) => {
    try {
      // Use the email from the form for authentication
      await signInWithEmailAndPassword(FIREBASE_AUTH, values.correo, values.contraseña);
      navigation.navigate('Actividades');
    } catch (error) {
      // Handle different types of authentication errors
      let errorMessage = 'Error de inicio de sesión: ';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage += 'Correo electrónico inválido';
          break;
        case 'auth/user-disabled':
          errorMessage += 'Usuario deshabilitado';
          break;
        case 'auth/user-not-found':
          errorMessage += 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage += 'Contraseña incorrecta';
          break;
        case 'auth/invalid-credential':
          errorMessage += 'Correo o contraseña incorrectos.';
          break;
        default:
          errorMessage = error.message;
      }

      setLoginError(errorMessage);

    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ correo: '', contraseña: '' }}
        validationSchema={LoginSchema}
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
            <Text style={styles.title}>Iniciar Sesión</Text>

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

            {/* Botón de Envío */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Iniciar sesion</Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>{LoginError}</Text>

            {/* Nuevo botón de Registro */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Registro')}
            >
              <Text style={styles.registerButtonText}>
                ¿No tienes cuenta? Regístrate
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
