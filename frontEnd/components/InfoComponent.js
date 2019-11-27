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

const loremIpsum = "Wood from Finland conference has become an interesting, annual event in Helsinki. It tells a lot about how important international trade is to the participants and Finland in general. Year 2019 event was sold out so make sure you’ll not miss out 2020 conference."

class InfoComponent extends Component  {
    constructor(props) {
        super(props)
      }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.textBox}>
              <Text> WWFC 2020 </Text>
              <Text> 13.2.2020 </Text>
              <Text> Congress center </Text>
            </View>

            <View style={styles.textBox}>
              <Text style={styles.centeredText}> {loremIpsum} </Text>
            </View>

            <View style={styles.textBox}>
              <Text style={styles.centeredText}> 
              If you have any questions, do not hesitate to contact the WFFC team:

mail:info@sahateollisuus.com tel:+358404811722 </Text>
            </View>

            <View style={styles.textBox}>
              <Text style={styles.centeredText}> 
                The persons on the participants list have given their permission to display their information in the application.
              </Text>
            </View>
 
          </View>
        )
    }
}

// REQUIRED for navigation to work inside a custom button
export default withNavigation(InfoComponent) 

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
    borderColor: '#d6d7da',
    borderWidth: 4,
    // Margins = 10% of window width
    margin: (Dimensions.get('window').width / 100) * 10,
    // Padding = 2% of the screen width
    padding: (Dimensions.get('window').width / 100) * 2
  },

  centeredText: {
    textAlign: 'center'
  }

})
