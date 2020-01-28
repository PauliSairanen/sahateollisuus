import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import Communications from 'react-native-communications'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Card from './Card'
import Colors from '../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const ParticipantsItem = props => {
  let phoneNumber = props.phoneNumber
  let email = props.email

  return (
    <Card style={styles.card}>
      <View style={styles.contanctsContainer}>
        <View style={styles.contanctElement}>
          <Text>{props.firstName} {props.lastName}</Text>
        </View>
        <View style={styles.contanctElement}>
          <Text>{props.country}</Text>
        </View>

        <View style={styles.contanctElement}>
          <View style={styles.contactRow}>
            <View style={styles.icon}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
                size={Dimensions.get('window').width / 100 * 7}
                color={Colors.primary}
              />
            </View>
            <View style={styles.phoneAndEmail}>
              <Text>{props.phoneNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contanctElement}>
          <View style={styles.contactRow}>
            <View style={styles.icon}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-mail' : 'ios-mail'}
                size={Dimensions.get('window').width / 100 * 7}
                color={Colors.primary}
              />
            </View>
            <View style={styles.phoneAndEmail}>
              <Text>{props.email}</Text>
            </View>
          </View>
        </View>

      </View>


      <View style={styles.companyContainer}>
        <Text>{props.company}</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').width / 100 * 35,
    margin: 10,
    padding: 10
  },
  contanctsContainer: {
    flex: 5,
    flexDirection: 'column'
  },
  contanctElement: {
    flex: 1,
  },
  contactRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    alignItems: 'flex-start'
  },
  phoneAndEmail: {
    flex: 4,
    justifyContent: 'center'
  },
  companyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  link: {
    color: '#0044CC'
  }
})

export default ParticipantsItem

{/* <View style={styles.content}>
        <View style={styles.row}>
          <Text>Company: </Text>
          <Text style={{ fontWeight: 'bold' }}>{props.company}</Text>
        </View>
        <Text>Name: {props.firstName}</Text>
        <Text>Surname: {props.lastName}</Text>
        <Text>Country: {props.country}</Text>

 

        <TouchableComponent onPress={() => Communications.email([`${email}`, 'userEmail@email.com'], null, null, 'Demo project', 'Demo content for email')}>
          <View style={styles.button}>
            <Text>Email: </Text>
            <Text style={styles.link}>{props.email}</Text>
          </View>
          </View>
        </TouchableComponent> */}