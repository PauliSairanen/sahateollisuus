import React from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'

import programmeData from '../../data/jsonFiles/programme.json'
import ProgrammeItem from '../../components/ProgrammeItem'

const ProgrammeScreen = props => {
  return (
    <View>
      <FlatList
        data={programmeData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={programmeData =>
          <ProgrammeItem
            time={programmeData.item.Time}
            location={programmeData.item.Location}
            description={programmeData.item.Description}
            speaker={programmeData.item.NameOfSpeaker}
            titleOfSpeaker={programmeData.item.TitleOfSpeaker}
            specialTitleOfSpeaker={programmeData.item.SpecialTitleOfSpeaker}
            companyOfSpeaker={programmeData.item.CompanyOfSpeaker}
          />
        }
      />
    </View>
  )
}

export default ProgrammeScreen

