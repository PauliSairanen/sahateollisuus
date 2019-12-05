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

const eventName = "WWFC 2020"
const date = "13.2.2020"
const place = "Congress Center Helsinki"


const loremIpsum = "Wood from Finland conference has become an interesting, annual event in Helsinki. It tells a lot about how important international trade is to the participants and Finland in general. Year 2019 event was sold out so make sure you’ll not miss out 2020 conference."
const disclaimer = "The persons on the participants list have given their permission to display their information in the application."
const email = "mail:info@sahateollisuus.com"
const telephone = "+358404811722"


class InfoComponent extends Component  {
    constructor(props) {
        super(props)
      }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.textBox}>
              <Text> {eventName} </Text>
              <Text> {date} </Text>
              <Text> {place} </Text>
            </View>
          
            <View style={styles.line}/>

            <View style={styles.textBox}>
              <Text style={styles.centeredText}> {loremIpsum} </Text>
            </View>

            <View style={styles.line}/>

            <View style={styles.textBox}>
              <Text style={styles.centeredText}> If you have any questions, do not hesitate to contact the WFFC team:  </Text>
              <Text style={styles.centeredText}>  {telephone}  </Text>
              <Text style={styles.centeredText}> {email}  </Text>
            </View>

            <View style={styles.line}/>
            
            <View style={styles.textBox}>
              <Text style={styles.centeredText}> 
                {disclaimer}
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
