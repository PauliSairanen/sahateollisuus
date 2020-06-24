import EventMetadata from '../../models/eventMetadata'

export const SET_EVENTS_METADATA = 'SET_EVENTS_METADATA'
export const FETCH_SPEAKERS = 'FETCH_SPEAKERS'
export const FETCH_ALL_DATA = 'FETCH_ALL_DATA'
export const AUTHENTICATE = 'AUTHENTICATE'
export const PRELOAD_IMAGES = 'PRELOAD_IMAGES'
export const SAVE_LOCATION_DATA = 'SAVE_LOCATION_DATA'
export const SAVE_TOKEN = 'SAVE_TOKEN'
export const SAVE_RESPONSE_STATUS = 'SAVE_RESPONSE_STATUS'

import serverURL from '../../constants/Networking'
console.log('The server URL is = ' + serverURL)

// Fetching the metadata of events from server
export const fetchEventMetaData = () => {
  return async dispatch => {
    const response = await fetch(`${serverURL}/findmetadata`)
    const responseData = await response.json()

    const response2 = await fetch('https://google.com')
    console.log(response2)

    const loadedEventMetadata = []
    // Looking through the JSON data, and organizing it again for display
    for (const index in responseData) {
      loadedEventMetadata.push(
        new EventMetadata(
          responseData[index]._id,
          responseData[index].metadata.eventName,
          responseData[index].metadata.eventImage
        )
      )
    }
    // Dispatching the action to Reducer with the data
    dispatch({ type: SET_EVENTS_METADATA, eventsMetaData: loadedEventMetadata })
  }
}

export const fetchAllData = (id) => {
  console.log('Fetching data using id:' + id)
  return async dispatch => {
    const response = await fetch(`${serverURL}/findEvent`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'id': `${id}` })

    })
    console.log(response.status)
    const responseData = await response.json()
    console.log('Data received from server. Dispatching on!')
    dispatch({ type: FETCH_ALL_DATA, responseData: responseData })
  }
}

// _______________ OTHER ACTIONS _______________

export const fetchSpeakers = () => {
  return async dispatch => {
    const response = await fetch(`${serverURL}/findSpeakers`)
    const responseData = await response.json()
    const fetchedData = responseData.speakers
    dispatch({ type: FETCH_SPEAKERS, fetchedSpeakers: fetchedData })
  }
}

export const authenticate = (eventName, password) => {
  console.log('Trying to authentiate')
  return async dispatch => {
    const response = await fetch(`${serverURL}/mobileLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'eventName': `${eventName}`,
        'password': `${password}`
      })
    })
    console.log(response.status)
    if (!response.ok) {
      console.log('Request was not ok')
      let message = 'Incorrect event password'
      throw new Error(message)
    }
    console.log('request was ok, 200!')
    const body = await response.json()
    console.log(body)
    dispatch({ type: SAVE_TOKEN, token: body.token })
  }
}

export const saveCurrentPosition = (currentPositionData) => {
  return async dispatch => {
    dispatch({ type: SAVE_LOCATION_DATA, locationData: currentPositionData })
  }
}
