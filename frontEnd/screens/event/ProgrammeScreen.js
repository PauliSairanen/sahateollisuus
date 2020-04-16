import React from 'react'
import { View, FlatList, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

// import programmeData from '../../data/jsonFiles/programme.json'
import * as eventDataActions from '../../store/actions/eventData'

import ProgrammeItem from '../../components/ProgrammeItem'

const ProgrammeScreen = props => {
  const programmeData = useSelector(state => state.eventData.programmeData)
  console.log('_____ Log from Programme Screen _____')
  console.log(programmeData)

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

