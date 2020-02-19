import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../constants/Colors'

const ProgrammeItem = props => {
  const time = props.time
  const location = props.location
  const description = props.description
  const speaker = props.speaker
  const titleOfSpeaker = props.titleOfSpeaker
  const specialTitleOfSpeaker = props.specialTitleOfSpeaker
  const companyOfSpeaker = props.companyOfSpeaker

  // If only Time, Location and Description
  if (time && location && description && !speaker && !titleOfSpeaker && !specialTitleOfSpeaker && !companyOfSpeaker) {
    return (
      <View style={styles.card}>
        <View style={styles.timeContainer}>
          <Text>{props.time} </Text>
        </View>
        <View style={styles.columnContentContainer}>
          <View style={styles.rowContentContainer}>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.location}>{props.location}</Text>
          </View>
        </View>
      </View>
    )
  }
  // If everything else but Special title
  else if (time && location && description && speaker && titleOfSpeaker && !specialTitleOfSpeaker && companyOfSpeaker) {
    return (
      <View style={styles.card}>
        <View style={styles.timeContainer}>
          <Text>{props.time} </Text>
        </View>
        <View style={styles.columnContentContainer}>
          <View style={styles.rowContentContainer}>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.location}>{props.location}</Text>
          </View>
          <View style={styles.columnContentContainer}>
            <Text style={styles.speakerName}>{props.speaker}</Text>
            <Text style={styles.infoAboutSpeaker}>{props.titleOfSpeaker}</Text>
            <Text style={styles.infoAboutSpeaker}>{props.companyOfSpeaker}</Text>
          </View>
        </View>
      </View >
    )
  }
  // If all information
  else if (time && location && description && speaker && titleOfSpeaker && specialTitleOfSpeaker && companyOfSpeaker) {
    return (
      <View style={styles.card}>

        <View style={styles.timeContainer}>
          <Text>{props.time} </Text>
        </View>

        <View style={styles.columnContentContainer}>
          <View style={styles.rowContentContainer}>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.location}>{props.location}</Text>
          </View>
          <View style={styles.columnContentContainer}>
            <Text style={styles.speakerName}>{props.speaker}</Text>
            <Text style={styles.infoAboutSpeaker}>{props.titleOfSpeaker}</Text>
            <Text style={styles.infoAboutSpeaker}>{props.companyOfSpeaker}</Text>
            <Text style={styles.infoAboutSpeaker}>{props.specialTitleOfSpeaker}</Text>
          </View>
        </View>
      </View >
    )
  }
  else {
    return (
      <View></View>
    )
  }
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
  columnContentContainer: {
    flex: 6,
  },
  rowContentContainer: {
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
  },
  speakerName: {
    marginBottom: 6,
    fontSize: 15
  },
  infoAboutSpeaker: {
    fontSize: 12
  }
})

export default ProgrammeItem
