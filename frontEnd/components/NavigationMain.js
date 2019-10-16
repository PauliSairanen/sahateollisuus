import React, {Component} from 'react'
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,
  Image,Button,Dimensions,Alert, 
} from 'react-native';

let screenWidth = Math.round(Dimensions.get('window').width)

export default class NavigationMain extends React.Component {

  /*    Cheat sheet for components
  * 
  *     HTML components       ||      Native components
  * ___________________________________________   
  *     <div>                 ||      <View>
  * ___________________________________________
  *     <input type = "text"  ||      <InputText>
  * ___________________________________________
  *     <a> / <button>        ||      <Button>
  * ___________________________________________
  *     <img>                 ||      <Image>
  * 
  * */


  render() {
    return(

      // A view is the same as DIV in HTML
      <View>
          <Image
              style={{ width: screenWidth, height: 100}}
              source={require('./images/woods.jpg')}
            />
        <ScrollView>


          <Button
            title="Button 1"
            color="#FF0000"
            onPress={() => Alert.alert('I am a red button')}
          />

          <Button
            title="Button 1"
            color="#008000"
            onPress={() => Alert.alert('I am a green button')}
          />

          <Button
            title="Button 1"
            color="#0000FF"
            onPress={() => Alert.alert('I am a blue button')}
          />

        </ScrollView>
      </View>

    );
  }
}