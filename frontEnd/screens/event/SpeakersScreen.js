import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import speakersData from '../../data/jsonFiles/speakers_2020'
import SpeakersItem from '../../components/SpeakersItem'

const SpeakersScreen = props => {
  return (
    <View>
      <FlatList
        data={speakersData}
        keyExtractor={item => item.email}
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

const styles = StyleSheet.create({

})

export default SpeakersScreen