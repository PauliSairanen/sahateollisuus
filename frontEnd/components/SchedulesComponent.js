import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
} from 'react-native'

// REQUIRED for navigation to work inside a custom button
import {withNavigation} from 'react-navigation'
import NestedListView, {NestedRow} from 'react-native-nested-listview'




const data = [
  {
    category: "9.00 - 12.00 Congress Hall (All)",
    presentation : [
      {
        time : "9.00",
        title : "Welcome",
        description : "Mr. Pekka Kopra, Manning Director, Westas Oy, Chairman of Finnish Sawmills Association"
      },
      {
        time : "9.15",
        title : "Economic outlook",
        description : "Mr. Jan von Grerich, Chief Analyst, Nordea Bank"
      }
    ]
  },
  {
    category: "13 - 18.30 Congress Hall (Marketing)",
    presentation : [
      {
        time : "13.00",
        title : "Softwood outlook, China",
        description : "Ms. Anna Ni, Senior Advisor, Wood from Finland"
      },
      {
        time : "13.25",
        title : "Outlook of global chamical pulp supply and demand - Finnish perspective",
        description : "Ms. Teija Kottori, Vision Hunters"
      }
    ]
  }
]

const categories = []
const content = []

    data.forEach(function (value, i){
      categories.push(data[i].category)
      console.log(categories)
      data[i].presentation.forEach(function (value, i){
        content.push(value)
      })
    })
    console.log(content);




  


class SchedulesComponent extends Component  {
  constructor(props) {
    super(props)
  }
  
    createElements = () => {
      let table = []



    }
    
    render() {
      
        data1 = [
          {
            title: 'Node 1', 
                  items: 
                  [
                    {
                      time : "9.00",
                      title : "Welcome",
                      description : "Mr. Pekka Kopra, Manning Director, Westas Oy, Chairman of Finnish Sawmills Association"
                    },
                    {
                      title: 'Node 1.2'
                    }
                  ]}]

        data2 = [
          {
            category: "9.00 - 12.00 Congress Hall (All)",
            presentation : [
              {
                time : "9.00",
                title : "Welcome",
                description : "Mr. Pekka Kopra, Manning Director, Westas Oy, Chairman of Finnish Sawmills Association"
              },
              {
                time : "9.15",
                title : "Economic outlook",
                description : "Mr. Jan von Grerich, Chief Analyst, Nordea Bank"
              }
        ]}]

        return (
          <View>
            <NestedListView
            data={data}
            getChildrenName={(node) => 'presentation'}
            renderNode={(node, level) => (
            <NestedRow
              level={level}
              style={styles.row}
            >
              
              <Text>{node.category}</Text>
              <Text>{node.time}</Text>
              <Text>{node.title}</Text>
              <Text>{node.description}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#d6d7da',
    // borderWidth: 4,
    // Margins = 10% of window width
    margin: (Dimensions.get('window').width / 100) * 10,
    // Padding = 2% of the screen width
    padding: (Dimensions.get('window').width / 100) * 2
  },
  centeredText: {
    textAlign: 'center'
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#FFB400',
    width: Dimensions.get('window').width /100 * 90
  }

})


