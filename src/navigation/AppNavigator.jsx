import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddPasswordScreen from '../screens/AddPasswordScreen';
import SingUpScreen from '../screens/SingUpScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='Entrar' component={SingUpScreen}/>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='AddPassword' component={AddPasswordScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}