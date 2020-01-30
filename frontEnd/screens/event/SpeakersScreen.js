import React from 'react'
import { View, FlatList } from 'react-native'

import speakersData from '../../data/jsonFiles/speakers_2020.json'
import SpeakersItem from '../../components/SpeakersItem'

const SpeakersScreen = props => {
  return (
    <View>
      <FlatList
        data={speakersData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={speakersData =>
          <SpeakersItem 
            speaker={speakersData.item.Speaker}
            title={speakersData.item.Title}
            company={speakersData.item.Company}
            specialTitle={speakersData.item.SpecialTitle}
          />
        }
      />
    </View>
  )
}

export default SpeakersScreen