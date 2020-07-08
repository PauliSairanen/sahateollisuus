import { SET_EVENTS_METADATA, FETCH_ALL_DATA, SAVE_LOCATION_DATA, SAVE_TOKEN, SAVE_EMAIL, SAVE_METADATA_BY_EMAIL, SAVE_EVENT_ID } from '../actions/eventData'

// Set the data as initial state
const initialState = {
  // ___ Universal data ___
  eventsMetaData: [],
  email: null,
  eventId : null,
  currentLocation: {},
  authenticationToken: null,
  //___ Evet Data ___
  metaData: [],
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
        ...state, 
        eventId: action.eventsMetaData.id,
        eventsMetaData: action.eventsMetaData
      }
    case SAVE_EMAIL:
      console.log('Saving Email to redux')
      return {
        ...state,
        email: action.emailToSave
      }
    case SAVE_METADATA_BY_EMAIL:
      console.log('Saving metadata fetched by email')
      return {
        ...state,
        eventsMetaData: action.metaDataByEmail
      }
    case SAVE_TOKEN:
      console.log('JVT Token received. Saving the token')
      return {
        ...state,
        authenticationToken: action.token,
      }
    case SAVE_EVENT_ID: 
      console.log('Saving event ID')
      return {
        ...state, 
        eventId : action.eventId
      }
    case FETCH_ALL_DATA:
      console.log('entering Fetch all data')
      return {
        ...state,
        metaData: action.responseData.metadata, 
        programmeData: action.responseData.programme,
        speakersData: action.responseData.speakers,
        sponsorsData: action.responseData.sponsors,
        participantsData: action.responseData.participants,
        venueData: action.responseData.venue,
        aboutData: action.responseData.about,
        mapData: action.responseData.mapData
      }
    case SAVE_LOCATION_DATA:
      console.log('Saving location data to redux')
      return {
        ...state,
        currentLocation: action.locationData
      }
    default:
      return {
        state
      }
  }
}

export default eventDataReducer