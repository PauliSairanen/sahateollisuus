import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import Venue_1Tab from '../../components/Venue/Venue_1Tab'
import Venue_2Tabs from '../../components/Venue/Venue_2Tabs'
import Venue_3Tabs from '../../components/Venue/Venue_3Tabs'
import Venue_4Tabs from '../../components/Venue/Venue_4Tabs'
import Venue_5Tabs from '../../components/Venue/Venue_5Tabs'

const VenueScreen = props => {
  const venueData = useSelector(state => state.eventData.venueData)
  console.log(venueData)
  const amountOfTabs = venueData.length

  switch (amountOfTabs) {
    case 0: {
      return (
        <View style={styles.container}>
          <Text>No venue images set for this event.</Text>
        </View>
      )
    }
    case 1: {
      return (
        <Venue_1Tab />
      )
    }
    case 2: {
      return (
        <Venue_2Tabs />
      )
    }
    case 3: {
      return (
        <Venue_3Tabs />
      )
    }
    case 4: {
      return (
        <Venue_4Tabs />
      )
    }
    case 5: {
      return (
        <Venue_5Tabs />
      )
    }
    default: {
      return (
        <View style={styles.container}>
          <Text>No Tabs enabled for this amount of content.</Text>
          <Text>Please contact development Team</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})

export default VenueScreen