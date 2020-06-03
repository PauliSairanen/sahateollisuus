import React from 'react'
import { View,FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import SponsorLogoItem from '../../components/ListItems/SponsorLogoItem'

const SponsorsScreen = props => {
  const sponsorsData = useSelector(state => state.eventData.sponsorsData)
  console.log(sponsorsData)

  return (
    <View>
      <FlatList
        data={sponsorsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={sponsorsData =>
          <SponsorLogoItem
            link={sponsorsData.item.CompanyUrl}
            imageID={sponsorsData.item.ImageID}
          />
        }
      />
    </View>
  )
}

export default SponsorsScreen
