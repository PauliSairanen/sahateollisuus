import { SET_EVENTS_METADATA, FETCH_SPEAKERS, IS_LOADING_TRUE, IS_LOADING_FALSE, FETCH_ALL_DATA, SAVE_LOCATION_DATA } from '../actions/eventData'

// Set the data as initial state
const initialState = {
  // ___ Universal data ___
  isLoading: false,
  currentEventId: "",
  eventsMetaData: [],
  currentLocation: {},
  //___ Evet Data ___
  programmeData: [],
  speakersData: [],
  sponsorsData: [],
  participantsData: [],
  venueData: [],
  aboutData: [],
}

const eventDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS_METADATA:
      console.log('entering Set events case')
      return {
        currentEventId: action.eventsMetaData.id,
        eventsMetaData: action.eventsMetaData
      }
    case FETCH_ALL_DATA:
      console.log('entering Fetch all data')
      return {
        programmeData :  action.responseData.programme,
        speakersData :  action.responseData.speakers,
        sponsorsData :  action.responseData.sponsors,
        participantsData :  action.responseData.participants,
        venueData : action.responseData.venue,
        aboutData :  action.responseData.about,
      }
      case SAVE_LOCATION_DATA:
        console.log('Saving location data to redux')
        return {
          currentLocation : action.locationData
        }
    default:
      return state
  }
}

export default eventDataReducer