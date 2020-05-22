import { SET_EVENTS_METADATA, FETCH_SPEAKERS, IS_LOADING_TRUE, IS_LOADING_FALSE, FETCH_ALL_DATA } from '../actions/eventData'

// Set the data as initial state
const initialState = {
  // ___ Universal data ___
  isLoading: false,
  currentEventId: "",
  eventsMetaData: [],
  //___ Evet Data ___
  programmeData: [],
  speakersData: [],
  sponsorsData: [],
  participantsData: [],
  // venueData: [],
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
        programmeData :  action.allData.programme,
        speakersData :  action.allData.speakers,
        sponsorsData :  action.allData.sponsors,
        participantsData :  action.allData.participants,
        // venueData :  action.allFetchedData.about,
        aboutData :  action.allData.about,
      }

    // case FETCH_SPEAKERS:
    //   console.log('entering Set events case')
    //   return {
    //     speakersData: action.fetchedSpeakers
    //   }
    default:
      return state
  }
}

export default eventDataReducer