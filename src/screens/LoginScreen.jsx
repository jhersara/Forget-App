import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function LoginScreen({ navigation}) {
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>welcome to Forget App</Text>
      <View style={styles.boxButtom}>
        <Button icon='home' mode='contained' style={styles.button} onPress={() => navigation.navigate('Entrar')}>Ingresa</Button>
        <Button icon='gmail' mode='outlined' style={styles.button} onPress={() => navigation.navigate('Register')}>Reguistrate</Button>
      </View>
    </View>
  )
}

//Stylos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,

        //backgroundColor: '#000'
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    boxButtom: {
        width: '100%',
        height: '20%',
        justifyContent: 'space-around'
    },
    button: {
        height: 50,
    }
})