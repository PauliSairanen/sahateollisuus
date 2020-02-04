import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform, Dimensions} from 'react-native'

import Colors from '../constants/Colors'

import LoginScreen from '../screens/user/LoginScreen'
import MainNavigationScreen from '../screens/event/MainNavigationScreen'

import AboutScreen from '../screens/event/AboutScreen'
import ParticipantsScreen from '../screens/event/ParticipantsScreen'
import ProgrammeScreen from '../screens/event/ProgrammeScreen'
import SpeakersScreen from '../screens/event/SpeakersScreen'
import SponsorsScreen from '../screens/event/SponsorsScreen'
import VenueScreen from '../screens/event/VenueScreen'
import FeedbackScreen from '../screens/event/FeedbaackScreen'


// _____ Navigation Options _____
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'Rubik-Bold',
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
    Feedback: FeedbackScreen,

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





