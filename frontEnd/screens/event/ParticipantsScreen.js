import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// import participantsData from '../../data/jsonFiles/participants'
import ParticipantsItem from '../../components/ParticipantsItem'

const sortedCompanies = []

 async function getParticipantsFromApi() {
  try {
    let response = await fetch('http://sahat.lamk.fi/findParticipants')
    let responseJson = await response.json();

    // Sorting data got from Json
    responseJson.participants.forEach(object => {
      
      if (!sortedCompanies.includes(object.Company)) {
        sortedCompanies.push(object)
      }
    });
    sortedCompanies.sort(function (a, b) {
      if (a.Company < b.Company) { return -1; }
      if (a.Company > b.Company) { return 1; }
      return 0;
    });
    console.log(sortedCompanies)
    return sortedCompanies
  } catch (error) {
    console.error(error);
  }
}

getParticipantsFromApi()
console.log('Log from outside Async')
console.log(sortedCompanies)


const ParticipantsScreen = props => {
  return (
    <View>
      <FlatList
        data={sortedCompanies}
        keyExtractor={(item, index) => index.toString()}
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

