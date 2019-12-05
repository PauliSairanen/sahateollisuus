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

class CustomButton extends Component  {
    constructor(props) {
        super(props)
      }

    render() {
        return (
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate(this.props.navigateTo)} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> {this.props.title} </Text>
                    </View>
                </TouchableHighlight>
        )
    }
}

// REQUIRED for navigation to work inside a custom button
export default withNavigation(CustomButton) 

const styles = StyleSheet.create({

    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      borderColor: '#000',
      borderBottomWidth: 5,
    },
    button: {
      marginBottom: 30,
      width: Dimensions.get('window').width / 100 * 45,
      alignItems: 'center',
      backgroundColor: '#FFB400',
      borderRadius: 20,
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: '#FFF',
    },
    touchableOpacity: {
        width: 100,
        height: 50
    }
})
