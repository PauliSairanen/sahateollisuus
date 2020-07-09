import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AdjustingText from '../Universal/AdjustingText'

const ProgrammeItem = props => {
  const [time, setTime] = useState(props.time)
  const [location, setLocation] = useState(props.location)
  const [description, setDescription] = useState(props.description)
  const [speaker, setSpeaker] = useState(props.speaker)
  const [titleOfSpeaker, setTitleOfSpeaker] = useState(props.titleOfSpeaker)
  const [specialTitleOfSpeaker, setSpecialTitleOfSpeaker] = useState(props.specialTitleOfSpeaker)
  const [companyOfSpeaker, setCompanyOfSpeaker] = useState(props.companyOfSpeaker)

  return (
    <View style={styles.card}>
      <View style={styles.leftContainer}>
        <AdjustingText>{time} </AdjustingText>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.description}>{description}</Text>
        {speaker
          ? <Text style={styles.speakerName}>{speaker}</Text>
          : <View></View>
        }
        {titleOfSpeaker
          ? <Text style={styles.infoAboutSpeaker}>{titleOfSpeaker}</Text>
          : <View></View>
        }
        {companyOfSpeaker
          ? <Text style={styles.infoAboutSpeaker}>{companyOfSpeaker}</Text>
          : <View></View>
        }
        {specialTitleOfSpeaker
          ? <Text style={styles.infoAboutSpeaker}>{specialTitleOfSpeaker}</Text>
          : <View></View>
        }
      </View>
      <View style={styles.rightContainer}>
        <AdjustingText style={styles.location}>{location}</AdjustingText>
      </View>
    </View>
  )
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
