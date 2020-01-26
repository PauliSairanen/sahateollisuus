import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import participantsData from '../../data/jsonFiles/participants.json'
import participantsSort from '../../algorithms/ParticipantsSort'
import ParticipantsItem from '../../components/ParticipantsItem'

// Calling sort function
// let dataForRender = ParticipantsSort(dataToBeSorted)

// The sort function isn´t done, when the data is passed on
// This has to be made into an Async function, and await for the results

// const sortedParticipants = participantsSort(participantsData)
// console.log(sortedParticipants.forEach(Element))
const dataToBeSorted = participantsData

let sortedCompanies = [];
    let finalArray = [];

    for (object in dataToBeSorted){
      if (!sortedCompanies.includes(Object.Company)) {
        sortedCompanies.push(object)
      }
    }
    sortedCompanies.sort(function (a, b) {
      if (a.Company < b.Company) {return -1}
      if (a.Company > b.Company) {return 1}
      return 0
    }) 
          // index = company

          // Finish the sort algorithm here <----------------------------
    // for (index in sortedCompanies) {
    //   if (finalArray[index].Company == undefined)
    // }


    // dataToBeSorted.forEach(object => {
    //     if (!sortedCompanies.includes(object.Company)) {
    //         sortedCompanies.push(object)
    //     }
    // });
    // sortedCompanies.sort(function (a, b) {
    //     if (a.Company < b.Company) { return -1; }
    //     if (a.Company > b.Company) { return 1; }
    //     return 0;
    // });

    // ---------------------------------------------------------
    // sortedCompanies.map(Company => {
    //     if (finalArray[Company.Company] == undefined) {
    //         finalArray[Company.Company] = [];
    //         dataToBeSorted.map(object => {
    //             if (object.Company == Company.Company) {
    //                 finalArray[Company.Company].push({

    //                     FirstName: object.FirstName,
    //                     LastName: object.LastName,
    //                     Country: object.Country,
    //                     Role: object.Icomefrom,
    //                     Telephone: object.PhoneNumber.split(" "),
    //                     Email: object.Email.split(" ")
    //                 });
    //             }
    //         });
    //         console.log(finalArray[Company])
    //         finalArray[Company.Company].sort(function (a, b) {
    //             if (a.LastName < b.LastName) { return -1; }
    //             if (a.LastName > b.LastName) { return 1; }
    //             return 0;
    //         });
    //     }
    // });

// console.log(finalArray)

const ParticipantsScreen = props => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={finalArray}
        keyExtractor={(finalArray, index) => finalArray.index}
        renderItem={(finalArray, index) =>
          <ParticipantsItem
            passOnData={finalArray[index]}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default ParticipantsScreen