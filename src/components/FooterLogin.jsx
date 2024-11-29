import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function FooterLogin({navigation}) {
  return (
    <View style={styles.footer}>
        <TouchableOpacity onPress={()=>{}}>
            <Text style={styles.footerText}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <Text style={styles.footerText}>Registrate.!</Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerText: {
    color: '#6200ee'
  },
})