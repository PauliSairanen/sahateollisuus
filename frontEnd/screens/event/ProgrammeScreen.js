import React from 'react'
import { View, FlatList, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

// import programmeData from '../../data/jsonFiles/programme.json'
import ProgrammeTab1 from '../../components/Programme/ProgrammeTab1'
import ProgrammeTab2 from '../../components/Programme/ProgrammeTab2'

const ProgrammeScreen = props => {
  const programmeData = useSelector(state => state.eventData.programmeData)
  const amountOfTabs = 1

  // ProgrammeData needs to have a parent object, that contains day information

  switch(amountOfTabs) {
    case 1: {
      return (
        <ProgrammeTab2
          data={programmeData}
        />
      )
    }
    case 2: {
      return (
        <View></View>
       
      )
    }
    case 3: {
      return (
        <View></View>
     
      )
    }
    case 4: {
      return (
        <View></View>
    
      )
    }
    case 5: {
      return (
        <View></View>
      )
    }  
  }
}

export default ProgrammeScreen

