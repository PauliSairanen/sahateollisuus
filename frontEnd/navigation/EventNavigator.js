import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawItems } from 'react-navigation-drawer'
import { Platform, SafeAreaView, View, Button } from 'react-native'

import Ionicons from 'react-native-vector-icons'
import Colors from '../constants/Colors'

import LoginScreen from '../screens/user/LoginScreen'
import ListEventsScreen from '../screens/event/ListEventsScreen'
import MainNavigationScreen from '../screens/event/MainNavigationScreen'

import AboutScreen from '../screens/event/AboutScreen'
import ParticipantsScreen from '../screens/event/ParticipantsScreen'
import ProgrammeScreen from '../screens/event/ProgrammeScreen'
import SpeakersScreen from '../screens/event/SpeakersScreen'
import SponsorsScreen from '../screens/event/SponsorsScreen'
import VenueScreen from '../screens/event/VenueScreen'


// _____ Navigation Options _____
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'Rubik-Bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'Rubik-Medium'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

// _____ Navigators _____
const ScreenNavigator = createStackNavigator(
  {
    MainScreen: MainNavigationScreen,
    About: AboutScreen,
    Participants: ParticipantsScreen,
    Programme: ProgrammeScreen,
    Speakers: SpeakersScreen,
    Sponsors: SponsorsScreen,
    Venue: VenueScreen,
    Login: LoginScreen,

  }, {
    defaultNavigationOptions: defaultNavOptions
  }
)

const LoginNavigator = createStackNavigator(
  {
    Login: LoginScreen
  }, {
  defaultNavigationOptions: defaultNavOptions
}
)

const MainNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  MainNavScreen: ScreenNavigator
})

export default createAppContainer(MainNavigator)






// const AboutNavigator = createStackNavigator(
//   {
//     About: AboutScreen
//   }, {
//   navigationOptions: {
//     drawerIcons: drawerConfig => (
//       <Ionicons
//         name={Platform.OS === 'android' ? 'md-information' : 'ios-information'}
//         size={23}
//         color={drawerConfig.tintColor}
//       />
//     )
//   },
//   defaultNavigationOptions: defaultNavOptions
// }
// )

// const ProgrammeNavigator = createStackNavigator(
//   {
//     Programme: ProgrammeScreen
//   }, {
//   navigationOptions: {
//     drawerIcons: drawerConfig => (
//       <Ionicons
//         name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
//         size={23}
//         color={drawerConfig.tintColor}
//       />
//     )
//   },
//   defaultNavigationOptions: defaultNavOptions
// }
// )

// const SpeakersNavigator = createStackNavigator(
//   {
//     Speakers: SpeakersScreen
//     // AboutSpeakers: AboutSpeakersScreen
//     // Keynotes: KeynotesScreen
//   }, {
//   navigationOptions: {
//     drawerIcons: drawerConfig => (
//       <Ionicons
//         name={Platform.OS === 'android' ? 'md-megaphone' : 'ios-megaphone'}
//         size={23}
//         color={drawerConfig.tintColor}
//       />
//     )
//   },
//   defaultNavigationOptions: defaultNavOptions
// }
// )

// const ParticipantsNavigator = createStackNavigator(
//   {
//     Participants: ProgrammeScreen
//   }, {
//   navigationOptions: {
//     drawerIcons: drawerConfig => (
//       <Ionicons
//         name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
//         size={23}
//         color={drawerConfig.tintColor}
//       />
//     )
//   },
//   defaultNavigationOptions: defaultNavOptions
// }
// )

// // _____ Drawer Navigator _____

// const EventDrawerNavigator = createDrawerNavigator(
//   {
//     AboutNav: AboutNavigator,
//     ProgrammeNav: ProgrammeNavigator,
//     SpeakerNav: SpeakersNavigator,
//     ParticipantsNav: ParticipantsNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     },
//     // ------- Disabled untill login is appropriate -------
//     // contentComponent: props => {
//     //   const dispatch = useDispatch()
//     //   return (
//     //     <View style={{ flex: 1, paddingTop: 20 }}>
//     //       <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//     //         <DrawerItems {...props} />
//     //         <Button title="Logout" color={Colors.primary} onPress={() => { 
//     //           dispatch(authActions.logout())
//     //           // props.navigation.navigate('Auth')
//     //         }} />
//     //       </SafeAreaView>
//     //     </View>
//     //   )
//     // }
//   },
// )




