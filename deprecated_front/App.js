import React from 'react'
import {SafeAreaView, StyleSheet, ScrollView, View,Text, StatusBar,FlatList,Button, Dimensions, Platform, TouchableHighlight 
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


import CustomButton from './components/CustomButton'
import Participants from './components/Participants'
import InfoComponent from './components/InfoComponent'
import SchdulesComponent from './components/SchedulesComponent'
import SchedulesComponent from './components/SchedulesComponent'
import MapsComponent from './components/MapsComponent'
import SchedulesComponent2 from './components/SchedulesComponent2.0'
import { program } from '@babel/types'


const numColumns=2;

// Data of navi elements
const naviScreenData =[
  {id: 1, title: 'Participants', link: 'Participants', icon: 'account'},
  {id: 2, title: 'Schedules', link: 'Schedules', icon: 'timetable'},
  {id: 3, title: 'Materials', link: 'Materials', icon: 'file-cloud'},
  {id: 4, title: 'Maps', link: 'Maps', icon: 'map-marker-outline'},
  {id: 5, title: 'Info', link: 'Info', icon: 'information-variant'},
  {id: 6, title: 'Infinity', link: 'Infinity', icon: 'infinity'},
]

// Navi elements turned into array with keys (Not sure if needed)
const inputData = Object.keys(naviScreenData).map(key => ({
  key, 
  ...naviScreenData[key]
}))

class LoginScreen extends React.Component{
  constructor(props) {
    super(props);
}
  render() {
    return (
      <View
        style={styles.container}>
        <CustomButton
          title = {'Login'} 
          navigateTo = {'Events'}
      />
      </View>
    );
  }
}

class EventsScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
      <Text> Sahateollisuus App</Text>
      <Text> A list of events will appear here </Text>
      <Text>  </Text>
      
        <CustomButton
          title = {'Event 1'}
          navigateTo = {'Navigation'}
        />

        <CustomButton
          title = {'Event 2'}
          navigateTo = {'Navigation'}
        />

        <CustomButton
          title = {'Event 3'}
          navigateTo = {'Navigation'}
        />

      </View>
    );
  }
}

class NavigationScreen extends React.Component {

  // Not sure what this is...?
  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    })
  }

  // Gets the screen size and adjusts the icon size accordingly
  iconSize = Dimensions.get('window').width / 6



  renderItem = ({item, index} ) => {
    return (

  
 

      
      <View style={styles.item} >
        <View style={styles.imageContainer}>
          <Text >
              <Icon name= {item.icon} size={this.iconSize} color="#FFF" />
          </Text> 
        </View>
      
        <CustomButton
          title = {item.title}
          navigateTo = {item.link}
          backgroundColor = {'#FFB400'}
        />

        {/* <Button 
          title={item.title}
          onPress={() => this.props.navigation.navigate(item.link)}>
          <Text style={styles.itemText}>
           {item.title}
          </Text>
        </Button> */}
      </View>

   
    )
  }

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.navigationBlock}
        data= {naviScreenData}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}/>
    );
  }
}

class ParticipantsScreen extends React.Component {
  render() {
    return (

      <Participants/>

      /*
      <View style={styles.container}>
        <Text>this is a participants screen</Text>
        <Button
          title="Participants"
          onPress={() => this.props.navigation.navigate('Participants')}
       
        />
      </View>
      */
    );
  }
}

class SchedulesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
      arrayOfCategories: [
        {
          name: 'Schedule for employyees',
          program :[
            {   
              id: 1,
              time: '09:00', 
              nameOfPerformance: 'Welcome',
              performer: 'Pekka Kopra',
              company: 'Westas Oy',
              title: 'Chairman of Finnish Sawmills Association'
            },
            { 
              id: 2,
              time: '10:00', 
              nameOfPerformance: 'Sawmill Industry Handbook',
              performer: 'Mr. Ilkka Tarvainen',
              company: 'Lahti University of Applied Sciences',
              title: 'Title of the guy from LAMK'
            },
          ],
        },
        {
        name: 'Schedule for all!:D',
        program :[
          {   
            id: 1,
            time: '21:00', 
            nameOfPerformance: 'GT',
            performer: 'ALL',
            company: '-',
            title: '-'
          },
          { 
            id: 2,
            time: '24:00', 
            nameOfPerformance: 'Afterparty',
            performer: 'All',
            company: 'All companies',
            title: 'Titles don´t matter anymore at this point'
          },
        ],
        }
      ]
    }   
  }
  

  renderAccordians=()=> {
    const items = [];
    var index = 0
    for (item of this.state.arrayOfCategories) {
        items.push(
            <SchedulesComponent2 
                title = {this.state.arrayOfCategories[index].name}
                data = {this.state.arrayOfCategories[index].program}
            />
        );
        index++
    }
    return items;
}


  render() {
    return (
      (
        <View >
          { this.renderAccordians() }
        </View>
      )
    );
  }
}


class MaterialsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>this is a Material screen</Text>
        <Button
          title="This button does nothing"
         /* onPress={() => this.props.navigation.navigate('Details')}
        */
         />
      </View>
    );
  }
}


class MapsScreen extends React.Component {
  render() {
    return (
    <MapsComponent/>
    );
  }
}


class InfoScreen extends React.Component {
  render() {
    return (
      <InfoComponent/>
    );
  }
}

class InfinityScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>this is a Infinity screen</Text>
        <Button
          title="This button does nothing"
         /* onPress={() => this.props.navigation.navigate('Details')}
        */
         />
      </View>
    );
  }
}
const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Events: EventsScreen,
    Navigation: NavigationScreen,
    Participants: ParticipantsScreen,
    Schedules : SchedulesScreen,
    Materials: MaterialsScreen,
    Maps: MapsScreen, 
    Info: InfoScreen,
    Infinity: InfinityScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  navigationBlock: {
    marginVertical: 20,
  },

  item:{
    backgroundColor: '#FFB400', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
    margin: 1, 
    height: Dimensions.get('window').width/numColumns
  },

  imageContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
    paddingTop: Dimensions.get('window').width/10
  },
});
