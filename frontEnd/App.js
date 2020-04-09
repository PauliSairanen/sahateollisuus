import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import BodyText from './components/TextComponents/BodyText'

import EventNavigator from './navigation/EventNavigator'

export default function App() {
  return (
    <EventNavigator />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})