import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native'

// REQUIRED for navigation to work inside a custom button
import { withNavigation } from 'react-navigation'
import NestedListView, { NestedRow } from 'react-native-nested-listview'
import { Left } from 'native-base'

// Test data for the component

// ToDo, Pass data from DB to this component
const data = [
  {
    category: "9.00 - 12.00 Congress Hall (All)",
    presentation: [
      {
        time: "9.00",
        title: "Welcome",
        description: "Mr. Pekka Kopra, Manning Director, Westas Oy, Chairman of Finnish Sawmills Association"
      },
      {
        time: "9.15",
        title: "Economic outlook",
        description: "Mr. Jan von Grerich, Chief Analyst, Nordea Bank"
      }
    ]
  },
  {
    category: "13 - 18.30 Congress Hall (Marketing)",
    presentation: [
      {
        time: "13.00",
        title: "Softwood outlook, China",
        description: "Ms. Anna Ni, Senior Advisor, Wood from Finland"
      },
      {
        time: "13.25",
        title: "Outlook of global chamical pulp supply and demand - Finnish perspective",
        description: "Ms. Teija Kottori, Vision Hunters"
      }
    ]
  }
]

// Calculate how many categories there are
var amountOfCategories = 0
data.forEach(element => {
  if(element.category != null) {
    amountOfCategories++
  }
  console.log("Amount of categories found:" + amountOfCategories)
})


  
class SchedulesComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <NestedListView
          data={data}     // This is the whole array of data
          getChildrenName={(presentation) => 'presentation'}  // This is the child array
          renderNode={(presentation, level) => (
            <NestedRow
              level={level}
              style={styles.row}
            >
              <View style={styles.categoryStyle}>   
                <Text style={styles.centeredText}> {presentation.category}</Text>
              </View>
              
              <View style={styles.titleBox}>
                <Text>{presentation.time}   {presentation.title}</Text>
              </View>
              <View style={styles.textBox}>
                <Text>{presentation.description}</Text>
              </View>
            </NestedRow>
          )}
        />
      </View>
    )
  }
}

// REQUIRED for navigation to work inside a custom button
export default withNavigation(SchedulesComponent)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: (Dimensions.get('window').width / 100) * 2,
    borderColor: 'black',
    borderWidth: 2,
  }, 
  row: {
    // borderColor: 'gray',
    // borderWidth: 1,
    // backgroundColor: 'blue'

  },
  categoryStyle: {
  

  },
  titleBox: {
    justifyContent: 'center',
    // backgroundColor: 'green'
   
  },
  textBox: {
    // backgroundColor: 'gray',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#FFB400',
    width: Dimensions.get('window').width / 100 * 90
  },
  titleStyle: {

  },
  centeredText: {
    textAlign: 'left'

  },
})


