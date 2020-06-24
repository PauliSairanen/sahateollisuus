import { SET_EVENTS_METADATA, FETCH_SPEAKERS, IS_LOADING_TRUE, IS_LOADING_FALSE, FETCH_ALL_DATA, SAVE_LOCATION_DATA, SAVE_TOKEN, SAVE_RESPONSE_STATUS } from '../actions/eventData'

// Set the data as initial state
const initialState = {
  // ___ Universal data ___
  isLoading: false,
  currentEventId: "",
  eventsMetaData: [],
  currentLocation: {},
  authenticationToken: null,
  authResponseStatus: '',
  //___ Evet Data ___
  programmeData: [],
  speakersData: [],
  sponsorsData: [],
  participantsData: [],
  venueData: [],
  aboutData: [],
  mapData: []
}

const eventDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS_METADATA:
      console.log('entering Set events case')
      return {
        currentEventId: action.eventsMetaData.id,
        eventsMetaData: action.eventsMetaData
      }
    case SAVE_RESPONSE_STATUS:
      console.log('Setting Auth response status')
      return {
        authResponseStatus: action.responseStatus
      }
    case SAVE_TOKEN:
      console.log('JVT Token received. Saving the token')
      return {
        authenticationToken: action.token,
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
        mapData : action.responseData.mapData
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