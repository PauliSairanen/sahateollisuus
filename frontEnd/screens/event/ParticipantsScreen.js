import React, { useState, useCallback, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'

import participantsData from '../../data/jsonFiles/participants.json'
import ParticipantsItem from '../../components/ParticipantsItem'

// __________ Function that gets data from the server __________
//  async function getParticipantsFromApi() {
//   try {
//     let response = await fetch('http://sahat.lamk.fi/findParticipants')
//     let responseJson = await response.json();

const ParticipantsScreen = props => {
  // const [isLoading, setIsLoading] = useState(false)
  const [dataInState, setDataInState] = useState(participantsData)
  const [searchText, setSearchText] = useState()

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

