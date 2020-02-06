import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const ProgrammeItem = props => {
  return (
    <View style={styles.card}>
      <View style={styles.timeContainer}>
        <Text>{props.time} </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.nestedContentContainer}>
          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.location}>{props.location}</Text>
        </View>
        <View style={styles.nestedContentContainer}>
          <Text>{props.speaker}</Text>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 3,
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  timeContainer: {
    flex: 2,
    marginVertical: 5,
    marginRight: 10,
  },
  contentContainer: {
    flex: 6,
    flexDirection: 'column'
  },
  nestedContentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  description: {
    flex: 1,
    paddingRight: 20,
    fontWeight: 'bold' 
  },
  location: {
    flex: 1,
  }
})

export default ProgrammeItem
