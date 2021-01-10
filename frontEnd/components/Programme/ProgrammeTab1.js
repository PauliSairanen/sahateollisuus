import React from 'react'
import { View, FlatList, } from 'react-native'

import ProgrammeItem from '../ListItems/ProgrammeItem'

const ProgrammeScreen = props => {
  const programmeData = props.data
  console.log('_____ Log from Programme Screen _____')
  console.log(programmeData)

  const day1Data = programmeData[0].content

  return (
    <View>
      <FlatList
        data={day1Data}
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

