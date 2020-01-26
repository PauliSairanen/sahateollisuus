import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

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

for (index in sortedCompanies) {
  console.log('____________________________')
  console.log(sortedCompanies.Company)
  console.log(sortedCompanies.FirstName)
  console.log(sortedCompanies.LastName)
  console.log(sortedCompanies.Country)
  console.log(sortedCompanies.PhoneNumber)
  console.log(sortedCompanies.Email)
}

const ParticipantsScreen = props => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={sortedCompanies}
        keyExtractor={item => item.email}
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

const styles = StyleSheet.create({

})

export default ParticipantsScreen

