import React from 'react'
import { useSelector } from 'react-redux'

import Venue_1Tab from '../../components/Venue_1Tab'
import Venue_2Tabs from '../../components/Venue_2Tabs'
import Venue_3Tabs from '../../components/Venue_3Tabs'
import Venue_4Tabs from '../../components/Venue_4Tabs'
import Venue_5Tabs from '../../components/Venue_5Tabs'

// Import all different venue tabs

const VenueScreen = props => {
  const venueData = useSelector(state => state.eventData.venueData)
  console.log(venueData)
  const amountOfTabs = venueData.length

  switch(amountOfTabs) {
    case 1: {
      return (
        <Venue_1Tab 
          data={venueData}
        />
      )
    }
    case 2: {
      return (
        <Venue_2Tabs
          data={venueData}
        />
      )
    }
    case 3: {
      return (
        <Venue_3Tabs
        data={venueData}
      />
      )
    }
    case 4: {
      return (
        <Venue_4Tabs
        data={venueData}
      />
      )
    }
    case 5: {
      return (
        <Venue_5Tabs
          data={venueData}
        />
      )
    }
      
  }
}

export default VenueScreen