import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { SearchBar } from 'react-native-elements'

import ParticipantsItem from '../../components/ListItems/ParticipantsItem'

const ParticipantsScreen = props => {
  const participantsData = useSelector(state => state.eventData.participantsData)
  console.log(participantsData)

  const [dataInState, setDataInState] = useState(participantsData)
  const [searchText, setSearchText] = useState()

  // Function user for filtering search results based on typed input
  const searchFilterFunction = (text) => {
    setSearchText(text)
    // Filtering always starts from fresh data
    const newData = participantsData.filter(item => {
      // Converting both company name and search text to uppercase to avoid missmatch
      const itemData = `${item.Company.toUpperCase()} ${item.FirstName.toUpperCase()} ${item.LastName.toUpperCase()}`
      const searchText = text.toUpperCase()
      return itemData.includes(searchText)
    }).sort()
    setDataInState(newData)
  }

  return (
    <View>
      <FlatList
        data={dataInState}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <SearchBar
            key='input'
            placeholder="Search"
            lightTheme
            round
            onChangeText={text => searchFilterFunction(text)}
            autoCorrect={false}
            value={searchText}
          />
        }
        stickyHeaderIndices={[0]}
        renderItem={itemData =>
          <ParticipantsItem
            company={itemData.item.Company}
            firstName={itemData.item.FirstName}
            lastName={itemData.item.LastName}
            country={itemData.item.Country}
            phoneNumber={itemData.item.Phone}
            email={itemData.item.Email}
          />
        }
      />
    </View>
  )
}

export default ParticipantsScreen

