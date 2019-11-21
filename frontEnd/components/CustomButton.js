import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'


import { TouchableHighlight } from 'react-native-gesture-handler'

// REQUIRED for navigation to work inside a custom button
import {withNavigation} from 'react-navigation'

class CustomButton extends Component (props) {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View styles={styles.buttonContainer}>
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate(this.props.NavigateTo)} underlayColor="white">
                <View styles={styles.buttonContainer}>
                    <Text styles={styles.buttonText}> This is a custom button </Text>
                </View>
        
            </TouchableHighlight>
            </View>
        )
    }
}

const NavigateTo = ({}) => '{}'

// REQUIRED for navigation to work inside a custom button
export default withNavigation(CustomButton)

const styles = StyleSheet.create({

    buttonContainer: {
      paddingTop: 60,
      alignItems: 'center'
    },
    button: {
      marginBottom: 30,
      width: 260,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white'
    }
})
