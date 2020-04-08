import { SET_EVENTS_METADATA, FETCH_SPEAKERS, IS_LOADING_TRUE, IS_LOADING_FALSE } from '../actions/eventData'

// Set the data as initial state
const initialState = {
  eventsMetaData: [],
  speakersData: []
}

const eventDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS_METADATA:
      console.log('entering Set events case')
      return {
        eventsMetaData: action.eventsMetaData
      }
    case FETCH_SPEAKERS:
      console.log('entering Set events case')
      return {
        speakersData: action.fetchedSpeakers
      }
    default:
      return state
  }
}

export default eventDataReducer