import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.screen}>
      <Text>Saha App 2.0!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})