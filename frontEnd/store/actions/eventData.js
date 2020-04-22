import EventMetadata from '../../models/eventMetadata'

export const SET_EVENTS_METADATA = 'SET_EVENTS_METADATA'
export const FETCH_SPEAKERS = 'FETCH_SPEAKERS'
export const FETCH_ALL_DATA = 'FETCH_ALL_DATA'
export const AUTHENTICATE = 'AUTHENTICATE'
export const PRELOAD_IMAGES = 'PRELOAD_IMAGES'

// Fetching the metadata of events from server
export const fetchEventMetaData = () => {
  return async dispatch => {
    const response = await fetch('https://sahat.lamk.fi/findmetadata')
    const responseData = await response.json()

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
    const response = await fetch('https://sahat.lamk.fi/findEvent', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'id': `${id}`})
        
    })
    console.log(response.status)
    const responseData = await response.json()
    const fetchedData = responseData
    console.log(fetchedData)

    dispatch({type: FETCH_ALL_DATA, allData: fetchedData})
  }
}




// _______________ OTHER ACTIONS _______________

export const fetchSpeakers = () => {
  return async dispatch => {
    const response = await fetch('https://sahat.lamk.fi/findSpeakers')
    const responseData = await response.json()
    const fetchedData = responseData.speakers
    dispatch({ type: FETCH_SPEAKERS, fetchedSpeakers: fetchedData })
  }
}

export const authenticate = () => {
  const un = 'test'
  const pw = 'test'
  console.log('Trying to authentiate')
  return async dispatch => {
    const response = await fetch('https://sahat.lamk.fi/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'un': `${un}`,
        'pw': `${pw}`
      })
    })
    console.log(response.status)
    if (response.ok) {
      console.log('request was ok, 200!')
      // const responseData = await response.json()
      // const fetchedData = responseData
      // console.log(fetchedData)
    } else {
      console.log('Something is fucked up :)')
    }
  }
}
