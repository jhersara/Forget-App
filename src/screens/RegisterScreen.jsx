import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../services/firebase'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { View, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper'
import React from 'react'


//verificador de credenciales
export default function RegisterScreen({navigation}) {
  //Verificador de credenciales pw y eml
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Correo invalido').required('Campo requerido'),
    password: Yup.string().min(6, 'La contaseña debe de tener almenos 6 caraceres min').required('Campo obligatorio'),
  });

  //Credencial de autecidD en firebase
  const handleSignUp = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // El usuario se a creado correactamente 
        const user = userCredential.user;
        // Ahora se navega 
        navigation.navigate('Home');
      })
     .catch(error => {
      if (error.code = 'auth/email-already-in-use'){
        alert('La direcion de correo electronico ya esta en uso');
      } else {
        console.error('Error registrado', error.message)
      }
     });
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={RegisterSchema}
        onSubmit={handleSignUp}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors})=> (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Button  mode='outlined' onPress={handleSubmit}>Registrar</Button>
          </View>
        )}
      </Formik>
    </View>
  )
}

//Estylado
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8
  },
  error: {
    color: 'red',
    marginBottom: 12
  }
})