import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

export default function HomeScreen({navigation}) {
  const passwords = [];
  return (
    <View style={styles.container}>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>(
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
      <Button icon='eye-plus' mode='outlined' style={styles.button}>View Passwords Saves</Button>
      <Button icon='book-plus-outline'mode='outlined' style={styles.button} onPress={() => navigation.navigate('AddPassword')}>Add New Password</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    margin: 5
  }
});