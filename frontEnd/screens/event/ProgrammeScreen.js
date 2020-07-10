import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

// import programmeData from '../../data/jsonFiles/programme.json'
import ProgrammeTab1 from '../../components/Programme/ProgrammeTab1'
import ProgrammeTab2 from '../../components/Programme/ProgrammeTab2'
import ProgrammeTab3 from '../../components/Programme/ProgrammeTab3'

const ProgrammeScreen = props => {
  const programmeData = useSelector(state => state.eventData.programmeData)

  // -----> Edited for showcase usage <-----
  const amountOfTabs = programmeData.length

  console.log(amountOfTabs)
 
  switch (amountOfTabs) {
    case 1: {
      return (
        <ProgrammeTab1
          data={programmeData}
        />
      )
    }
    case 2: {
      return (
        <ProgrammeTab2 
          data={programmeData}
        />
      )
    }
    case 3: {
      return (
        <ProgrammeTab3 
        data={programmeData}
      />
      )
    }
    default: {
      return (
        <View style={styles.errorContainer}>
          <Text>No tabs enabled for this amount of content.</Text>
          <Text>Please contact the development Team.</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
})

export default ProgrammeScreen

