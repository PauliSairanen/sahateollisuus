import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'


const IndividualParticipant = props => {
  return (
    <View>
      <Text>{props.firstName} first name</Text>
      <Text>{props.lastName} last name:</Text>
      <Text>{props.country} country</Text>
      <Text>{props.role} role</Text>
      <Text>{props.telephone} telephone</Text>
      <Text>{props.email} email</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default IndividualParticipant