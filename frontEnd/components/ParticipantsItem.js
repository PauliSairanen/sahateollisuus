import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import Communications from 'react-native-communications'
import Ionicons from 'react-native-vector-icons/Ionicons'


import Card from './Card'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const ParticipantsItem = props => {
  let phoneNumber = props.phoneNumber
  let email = props.email

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Text style={{ fontWeight: 'bold' }}>Company: {props.company}</Text>
        <Text>Name: {props.firstName}</Text>
        <Text>Surname: {props.lastName}</Text>
        <Text>Country: {props.country}</Text>
        <TouchableComponent
        //                          Continue from here. Bind the variable into the string
          onPress={() => Communications.phonecall('$phoneNumber', true)}
        >
          <Text>Telephone: {props.phoneNumber}</Text>
        </TouchableComponent>
        <TouchableComponent
          onPress={() => Communications.email(email, true)}
        >
          <Text>Email: {props.email}</Text>
        </TouchableComponent>

      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
  },
  content: {
    margin: 20,





  },
})

export default ParticipantsItem