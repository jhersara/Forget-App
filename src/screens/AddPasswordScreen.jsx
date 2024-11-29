import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { db } from '../services/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { encryptPassword } from '../services/encryption';
import { Button, TextInput } from 'react-native-paper';

export default function AddPasswordScreen({navigation}) {

  //Verificador de datos
  const PasswordSchema = Yup.object().shape({
    name: Yup.string().required('Obligatorio'),
    password: Yup.string().required('Obigatorio'),
  });

  //Funcion para añadir los datos al servidor
  const handleAddPassword = async (values) =>{
    try {
      const encryptePassword = await encryptPassword(values.password);
      await addDoc(collection(db, "password"), {
        name: values.name,
        password: encryptePassword,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar la contraeña', error)
    }
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{name: '', password: ''}}
        validationSchema={PasswordSchema}
        onSubmit={handleAddPassword}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors}) =>(
          <View>
            <TextInput 
              style={styles.input}
              placeholder='Servicios Name (Email, Facebook, Insta)'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && <Text style={styles.error}>*{errors.name}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && <Text style={styles.error}>*{errors.password}</Text>}
            <Button icon='image-filter-none' mode='outlined' onPress={handleSubmit}>Añadir contraseña</Button>
          </View>
        )}
          

      </Formik>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});