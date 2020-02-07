import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

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
        <View style={styles.contentContainer}>
          <View style={styles.nestedContentContainer}>
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
  // If all information
  else if (time && location && description && speaker && titleOfSpeaker && specialTitleOfSpeaker && companyOfSpeaker) {
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
          <View style={styles.contentContainer}>
            <View style={styles.nestedContentContainer}>
              <Text>{props.specialTitleOfSpeaker}</Text>
            </View>
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
