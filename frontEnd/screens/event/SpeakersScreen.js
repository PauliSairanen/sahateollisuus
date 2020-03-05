import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'

import Colors from '../../constants/Colors'

// import speakersData from '../../data/jsonFiles/speakers.json'
import SpeakersItem from '../../components/SpeakersItem'

const SpeakersScreen = props => {
  const [dataFromServer, setDataFromServer] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //__________ Function that gets data from the server __________
  const fetchData = async () => {
    setIsLoading(true)
    try {
      let response = await fetch('https://sahat.lamk.fi/findSpeakers')
      let responseJson = await response.json()
      
      // DB returns an array with a key named speakers
      setDataFromServer(responseJson.speakers)
      setIsLoading(false)
      console.log(responseJson)
    } catch (error) {
      console.log(error)
    }
  }

  // Calls the function only once, when screen is laucnhed
  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading === true) {
    return (
      <View>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  } else {
    return (
      <View>
        <FlatList
          data={dataFromServer}
          extraData={dataFromServer}
          keyExtractor={(item, index) => index.toString()}
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
}

export default SpeakersScreen