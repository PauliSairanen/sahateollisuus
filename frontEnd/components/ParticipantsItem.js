import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Card from '../components/Card'
import IndivialParticipant from '../components/IndivialParticipant'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const ParticipantsItem = props => {
  const [showDetails, setShowDetails] = useState(false)

  const dataPerCompany = props.passOnData

  return (
    <TouchableComponent onPress={() => {
      setShowDetails(prevState => !prevState)
    }}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.companyName}>
            
            <Text>This text should show on screen</Text>
          </View>

          <View>
            {!showDetails &&
              <Ionicons
                name={Platform.OS === 'android' ? 'md-arrow-down' : 'ios-arrow-down'}
                size={23}
              />
            }
            {showDetails &&
              <Ionicons
                name={Platform.OS === 'android' ? 'md-arrow-up' : 'ios-arrow-up'}
                size={23}
              />
            }
          </View>
        </View>

        {showDetails &&
          <FlatList
            data={dataPerCompany}
            keyExtractor={(dataPerCompany, index) => dataPerCompany.index}
            renderItem={dataPerCompany => {
              <IndivialParticipant
                firstName={dataPerCompany.FirstName}
                lastName={dataPerCompany.LastName}
                country={dataPerCompany.Country}
                role={dataPerCompany.Role}
                telephone={dataPerCompany.Telephone}
                email={dataPerCompany.Email}
              />
            }}



          />
        }
      </Card>
    </TouchableComponent>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  header: {
    margin: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default ParticipantsItem