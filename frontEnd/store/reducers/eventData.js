import { SET_EVENTS_METADATA } from '../actions/eventData'

// Set the data as initial state
const initialState = {
  eventsMetaData: []
}

const eventDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS_METADATA:
      console.log('entering Set events case')
      return {
        eventsMetaData: action.eventsMetaData
      }
    default:
      return state
  }
}

export default eventDataReducer