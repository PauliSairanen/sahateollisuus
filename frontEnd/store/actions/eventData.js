import EventMetadata from '../../models/eventMetadata'

export const SET_EVENTS_METADATA = 'SET_EVENTS_METADATA'
export const FETCH_SPEAKERS = 'FETCH_SPEAKERS'
export const FETCH_ALL_DATA = 'FETCH_ALL_DATA'
export const AUTHENTICATE = 'AUTHENTICATE'
export const PRELOAD_IMAGES = 'PRELOAD_IMAGES'
export const SAVE_LOCATION_DATA = 'SAVE_LOCATION_DATA'
export const SAVE_TOKEN = 'SAVE_TOKEN'
export const SAVE_RESPONSE_STATUS = 'SAVE_RESPONSE_STATUS'
export const SAVE_EMAIL = 'SAVE_EMAIL'
export const SAVE_METADATA_BY_EMAIL = 'SAVE_METADATA_BY_EMAIL'
export const SAVE_EVENT_ID = 'SAVE_EVENT_ID'
export const SAVE_CURRENT_EVENT_METADATA = 'SAVE_CURRENT_EVENT_METADATA'

import serverURL from '../../constants/Networking'
console.log('The server URL is = ' + serverURL)

// _______________ 0. In test case, fetch all events  _______________
export const fetchEventMetaData = () => {
  return async dispatch => {
    const response = await fetch(`${serverURL}/findmetadata`)
    const responseData = await response.json()

    // Looking through the JSON data, and organizing it again for display
    const loadedEventMetadata = []
    for (const index in responseData) {
      loadedEventMetadata.push(
        new EventMetadata(
          responseData[index]._id,
          responseData[index].metadata.eventName,
          responseData[index].metadata.eventImage,
          responseData[index].metadata.visibility,
          responseData[index].metadata.address,
          responseData[index].metadata.lat,
          responseData[index].metadata.long,
        )
      )
    }
    // Dispatching the action to Reducer with the data
    dispatch({ type: SET_EVENTS_METADATA, eventsMetaData: loadedEventMetadata })
  }
}

// _______________ 0. For test cases, route without token can be used _______________
export const fetchAllDataTest = (id, token) => {
  console.log('Fetching data using id:' + id)
  return async dispatch => {
    const response = await fetch(`${serverURL}/findEventMobileTest`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'id': `${id}` })
    })
    console.log(response.status)
    if (!response.ok) {
      console.log('Using test route')
      console.log(response.body)
      let message = 'Response not ok, but entering event'
      throw new Error(message)
    }
    const responseData = await response.json()
    console.log('Data received from server. Dispatching on!')
    dispatch({ type: SAVE_EVENT_ID, eventId: id })
    dispatch({ type: FETCH_ALL_DATA, responseData: responseData })
  }
}


// _______________ 1. Check if email exists in any events. If OK, saves email and metadata to state _______________
export const fetchMetadataByEmail = (email) => {
  console.log('Checking if email exists')
  return async dispatch => {
    //_____HTTP POST request _____
    const response = await fetch(`${serverURL}/findEventsByEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': `${email}`,
      })
    })
    //_____ If errors in request _____
    console.log(response.status)
    if (!response.ok) {
      console.log('Request was not ok')
      let message = 'Email not registered to any event'
      throw new Error(message)
    }
    //_____ If request is OK _____
    console.log('request was ok, 200!')
    const responseData = await response.json()

    // Looking through the JSON data, and organizing it again for display
    const loadedEventMetadata = []
    for (const index in responseData) {
      loadedEventMetadata.push(
        new EventMetadata(
          responseData[index]._id,
          responseData[index].metadata.eventName,
          responseData[index].metadata.eventImage,
          responseData[index].metadata.visibility,
          responseData[index].metadata.address,
          responseData[index].metadata.lat,
          responseData[index].metadata.long,
        )
      )
    }
    dispatch({ type: SAVE_EMAIL, emailToSave: email })
    dispatch({ type: SAVE_METADATA_BY_EMAIL, metaDataByEmail: loadedEventMetadata })
  }
}

// _______________ 2. Once event clicked, eventName and password are used for authentication _______________
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
    return body.token
  }
}

// _______________ 3. Once authentication is OK, Fetch all data using event ID and Token _______________
export const fetchAllData = (id, token) => {
  console.log('Fetching data using id:' + id)
  return async dispatch => {
    const response = await fetch(`${serverURL}/findEventMobile`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 'id': `${id}` })
    })
    console.log(response.status)
    if (!response.ok) {
      console.log('Authentication failed')
      console.log(response.body)
      let message = 'Try logging in again'
      throw new Error(message)
    }
    const responseData = await response.json()
    console.log('Data received from server. Dispatching on!')
    dispatch({ type: SAVE_EVENT_ID, eventId: id })
    dispatch({ type: FETCH_ALL_DATA, responseData: responseData })
  }
}

// _______________ 4. Using Maps, saves current position to state _______________
export const saveCurrentPosition = (currentPositionData) => {
  return async dispatch => {
    dispatch({ type: SAVE_LOCATION_DATA, locationData: currentPositionData })
  }
}
