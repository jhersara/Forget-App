import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { auth } from '../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function SingUpScreen( {navigation}) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Correo Invalido').required('Campo obligatorio'),
        password: Yup.string().min(6, 'La contraseña debe de tener mas de 6 caracteres').required('Campo obligatorio'),
    });

    //Funcion para enviar los datos al servidor
    const handleLogin = (values) =>{
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredential => {
            const user = userCredential.user;
            Alert.alert('Usuario logeado', user);
            navigation.navigate('Home');
        })
        .catch(error =>{
            Alert.alert('Error al ingresar', error.message)
        })
    }

    return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido de nuevo!</Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors})=>(
            <>
            <Image
                source={require('../assets/favicon.png')}
                style={styles.logo}
            />

            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
                label='Usuario'
                style={styles.input}
                mode='outlined'
                keyboardType='email-address'
                onChangeText={handleChange('email')}
                left={<TextInput.Icon icon='account'/>}
                theme={{
                    fonts: {
                        regular: {
                            fontWeight: 'bold'
                        }
                    }
                }}
            />
            <TextInput
                label='Contraseña'
                style={styles.input}
                mode='outlined'
                secureTextEntry={!passwordVisible}
                right={
                    <TextInput.Icon
                        icon={passwordVisible ? "eye-off" : "eye"}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                }
                theme={{
                    fonts: {
                        regular: {
                            fontWeight: 'bold'
                        }
                    }
                }}
            />

            <Button mode='contained' style={styles.loginButton} onPress={()=> {}}>
                Ingresar
            </Button>
            </>
        )}
      </Formik>

      <View style={styles.footer}>
        <TouchableOpacity onPress={()=>{}}>
            <Text style={styles.footerText}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <Text style={styles.footerText}>Registrate.!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    input: {
        marginBottom: 15,
        fontSize: 17,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginVertical: 30,
    },
    loginButton: {
        marginTop: 20
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    footerText: {
        color: '#6200ee'
    },
})