import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'

import Colors from '../constants/Colors'

import LoginScreen from '../screens/universal/LoginScreen'
import MainNavigationScreen from '../screens/universal/MainNavigationScreen'
import SelectEventsScreen from '../screens/universal/SelectEventScreen'

import AboutScreen from '../screens/event/AboutScreen'
import ParticipantsScreen from '../screens/event/ParticipantsScreen'
import ProgrammeScreen from '../screens/event/ProgrammeScreen'
import SpeakersScreen from '../screens/event/SpeakersScreen'
import SponsorsScreen from '../screens/event/SponsorsScreen'
import VenueScreen from '../screens/event/VenueScreen'
import FeedbackScreen from '../screens/event/FeedbaackScreen'
import SpeakerDetailsScreen from '../screens/event/SpeakerDetailsScreen'

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
const EventNavigator = createStackNavigator(
  {
    SelectEvent: {
      screen: SelectEventsScreen,
      navigationOptions: {
        headerTitle: 'Select Event'
      }
    },
    MainScreen: {
      screen: MainNavigationScreen,
      navigationOptions: {
        headerBackTitle: 'Events'
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        headerBackTitle: 'Navigation'
      }
    },
    Participants: {
      screen: ParticipantsScreen,
      navigationOptions: {
        headerBackTitle: 'Navigation'
      }
    },
    Programme: {
      screen: ProgrammeScreen,
      navigationOptions: {
        headerBackTitle: 'Navigation'
      }
    },
    Speakers: {
      screen: SpeakersScreen,
      navigationOptions: {
        headerBackTitle: 'Navigation'
      }
    },
    Sponsors: {
      screen: SponsorsScreen,
      navigationOptions: {
        headerBackTitle: 'Navigation'
      }
    },
    Venue: {
      screen: VenueScreen,
      navigationOptions: {
        headerBackTitle: 'Navigation'
      }
    },
    Feedback: {
      screen: FeedbackScreen,
      navigationOptions: {
        headerBackTitle: 'Navigation'
      }
    },
    SpeakerDetails: {
      screen: SpeakerDetailsScreen,
      navigationOptions: {
        headerBackTitle: 'Speakers',
        headerTitle: 'Speaker Details'
      }
    }
  }, {
  defaultNavigationOptions: defaultNavOptions
}
)

const MainNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    EventNavi: EventNavigator
  })

export default createAppContainer(EventNavigator)


