import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AdjustingText from '../Universal/AdjustingText'

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
        <View style={styles.leftContainer}>
          <AdjustingText>{props.time} </AdjustingText>
        </View>
        <View style={styles.adjustingMiddleContainer}>
          <Text style={styles.description}>{props.description}</Text>
        </View>
        <View style={styles.rightContainer}>
          <AdjustingText style={styles.location}>{props.location}</AdjustingText>
        </View>
      </View>
    )
  }
  // If everything else but Special title
  else if (time && location && description && speaker && titleOfSpeaker && !specialTitleOfSpeaker && companyOfSpeaker) {
    return (
      <View style={styles.card}>
        <View style={styles.leftContainer}>
          <AdjustingText>{props.time} </AdjustingText>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.speakerName}>{props.speaker}</Text>
          <Text style={styles.infoAboutSpeaker}>{props.titleOfSpeaker}</Text>
          <Text style={styles.infoAboutSpeaker}>{props.companyOfSpeaker}</Text>
        </View>
        <View style={styles.rightContainer}>
          <AdjustingText style={styles.location}>{props.location}</AdjustingText>
        </View>
      </View>
    )
  }
  // If all information
  else if (time && location && description && speaker && titleOfSpeaker && specialTitleOfSpeaker && companyOfSpeaker) {
    return (
      <View style={styles.card}>
        <View style={styles.leftContainer}>
          <AdjustingText>{props.time} </AdjustingText>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.speakerName}>{props.speaker}</Text>
          <Text style={styles.infoAboutSpeaker}>{props.titleOfSpeaker}</Text>
          <Text style={styles.infoAboutSpeaker}>{props.companyOfSpeaker}</Text>
          <Text style={styles.infoAboutSpeaker}>{props.specialTitleOfSpeaker}</Text>
        </View>
        <View style={styles.rightContainer}>
          <AdjustingText style={styles.location}>{props.location}</AdjustingText>
        </View>
      </View>
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
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  leftContainer: {
    flex: 4,
    justifyContent: 'flex-start',
  },

  middleContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  adjustingMiddleContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    flex: 1,
    paddingRight: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  location: {
    textAlign: 'right'
  },
  speakerName: {
    marginBottom: 8,
    fontSize: 15,
    textAlign: 'center',
  },
  infoAboutSpeaker: {
    fontSize: 12,
    textAlign: 'center'
  }
})

export default ProgrammeItem
