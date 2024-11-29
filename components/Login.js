import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity } from 'react-native';
import { FIREBASE_APP, FIREBASE_ANALYTICS } from '../firebase/firebaseConfig'; // Asegúrate de usar la ruta correcta

import { Formik } from 'formik';
import * as Yup from 'yup';


// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  usuario: Yup.string()
    .required('El usuario es obligatorio'),
  correo: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es obligatorio'),
  contraseña: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(12, 'La contraseña debe tener máximo 12 caracteres')
    .required('La contraseña es obligatoria')
});

export default function Login({navigation}) {

    const handleSubmit = (values) => {
        navigation.navigate('Actividades');
      };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ usuario: '', correo: '', contraseña: '' }}
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

            {/* Campo de Usuario */}
            <TextInput
              style={[
                styles.input,
                (errors.usuario && touched.usuario) && styles.inputError
              ]}
              placeholder="Usuario"
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

            {/* Botón de Envío */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Continuar</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
});
