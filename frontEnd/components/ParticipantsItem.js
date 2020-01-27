import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import Communications from 'react-native-communications'


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
        <View style={styles.row}>
          <Text>Company: </Text>
          <Text style={{ fontWeight: 'bold' }}>{props.company}</Text>
        </View>
        <Text>Name: {props.firstName}</Text>
        <Text>Surname: {props.lastName}</Text>
        <Text>Country: {props.country}</Text>
        <View style={styles.row}>
          <Text>Telephone: </Text>
          <TouchableComponent onPress={() => Communications.phonecall(`${phoneNumber}`, true)}>
            <Text style={styles.link}>{props.phoneNumber}</Text>
          </TouchableComponent>
        </View>
        <View style={styles.row}>
          <Text>Email: </Text>
          <TouchableComponent onPress={() => Communications.email([`${email}`, 'userEmail@email.com'], null, null, 'Demo project', 'Demo content for email')}>
            <Text style={styles.link}>{props.email}</Text>
          </TouchableComponent>
        </View>

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
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  link: {
    color: '#0044CC'
  }
})

export default ParticipantsItem