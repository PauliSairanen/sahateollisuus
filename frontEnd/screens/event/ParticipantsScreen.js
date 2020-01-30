import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import participantsData from '../../data/jsonFiles/participants'
import ParticipantsItem from '../../components/ParticipantsItem'

const dataToBeSorted = participantsData
const sortedCompanies = [];

// Sorting data got from Json
dataToBeSorted.forEach(object => {
  if (!sortedCompanies.includes(object.Company)) {
    sortedCompanies.push(object)
  }
});
sortedCompanies.sort(function (a, b) {
  if (a.Company < b.Company) { return -1; }
  if (a.Company > b.Company) { return 1; }
  return 0;
});

const ParticipantsScreen = props => {
  return (
    <View>
      <FlatList
        data={sortedCompanies}
        keyExtractor={object => object.Email}
        renderItem={itemData =>
          <ParticipantsItem
            company={itemData.item.Company}
            firstName={itemData.item.FirstName}
            lastName={itemData.item.LastName}
            country={itemData.item.Country}
            phoneNumber={itemData.item.PhoneNumber}
            email={itemData.item.Email}
          />
        }
      />
    </View>
  )
}

export default ParticipantsScreen

