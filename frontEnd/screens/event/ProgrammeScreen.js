import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

// import programmeData from '../../data/jsonFiles/programme.json'
import ProgrammeTab1 from '../../components/Programme/ProgrammeTab1'
import ProgrammeTab2 from '../../components/Programme/ProgrammeTab2'
import ProgrammeTab3 from '../../components/Programme/ProgrammeTab3'
import ProgrammeTab4 from '../../components/Programme/ProgrammeTab4'
import ProgrammeTab5 from '../../components/Programme/ProgrammeTab5'

const ProgrammeScreen = props => {
  const programmeData = useSelector(state => state.eventData.programmeData)

  // -----> Edited for showcase usage <-----
  const amountOfTabs = programmeData.length
  const sortedData = programmeData.sort((a, b) => {
    return a < b
  })

  switch (amountOfTabs) {
    case 1: {
      return (
        <ProgrammeTab1
          data={sortedData}
        />
      )
    }
    case 2: {
      return (
        <ProgrammeTab2
          data={sortedData}
        />
      )
    }
    case 3: {
      return (
        <ProgrammeTab3
          data={sortedData}
        />
      )
    }
    case 4: {
      return (
        <ProgrammeTab4
          data={sortedData}
        />
      )
    }
    case 5: {
      return (
        <ProgrammeTab5
          data={sortedData}
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

