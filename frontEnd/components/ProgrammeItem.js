import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const ProgrammeItem = props => {
  return (
    <View style={styles.timeBlock}>
      <View style={styles.contentContainer}>

        <View style={styles.box}>
          <Text style={styles.text}>{props.time}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>{props.description}</Text>
          <Text>{props.location}</Text>
        </View>

        <View style={styles.box}>
          <Text>{props.speaker}</Text>
          <Text>{props.titleOfSpeaker}</Text>
          <Text>{props.companyOfSpeaker}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timeBlock: {
    height: Dimensions.get('window').width / 100 * 30,
    margin: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    padding: 10,
    textAlign:'center'
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },

})

export default ProgrammeItem