import React, { useState } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'

// import speakersData from '../../data/jsonFiles/speakers.json'
import SpeakersItem from '../../components/ListItems/SpeakersItem'

const SpeakersScreen = props => {
  const [isLoading, setIsLoading] = useState(false)

  //_____ Fetch data from global state ______
  const eventId = useSelector(state => state.eventData.eventId)
  const speakersData = useSelector(state => state.eventData.speakersData)
  console.log('_____ Log from Speakers Screen _____')
  console.log(speakersData)

  if (isLoading === true) {
    return (
      <View>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  } else {
    return (
      <View>
        <FlatList
          data={speakersData}
          extraData={speakersData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={speakersData =>
            <SpeakersItem
              speaker={speakersData.item.Speaker}
              title={speakersData.item.Title}
              company={speakersData.item.Company}
              specialTitle={speakersData.item.SpecialTitle}
              image={speakersData.item.ImageID}
              eventId={eventId}
              description={speakersData.item.Description}
            />
          }
        />
      </View>
    )
  }
}

export default SpeakersScreen

