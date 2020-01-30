import React from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'

import programmeData from '../../data/jsonFiles/programme_2020.json'
import ProgrammeItem from '../../components/ProgrammeItem'


const ProgrammeScreen = props => {
  return (
    <View>
      <FlatList
        data={programmeData}
        keyExtractor={item => item.index}
        renderItem={programmeData =>
          <ProgrammeItem
            time={programmeData.item.Time}
            location={programmeData.item.Location}
            description={programmeData.item.Description}
            speaker={programmeData.item.NameOfSpeaker}
            titleOfSpeaker={programmeData.item.TitleOfSpeaker}
            companyOfSpeaker={programmeData.item.CompanyOfSpeaker}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  topDescription: {
    backgroundColor: 'white',
    margin: 10,
    height: Dimensions.get('window').width / 100 * 10
  },
  topContentContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ProgrammeScreen

