import EventMetadata from '../../models/eventMetadata'

export const SET_EVENTS_METADATA = 'SET_EVENTS_METADATA'

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
    // console.log(loadedEventMetadata)

    // Dispatching the action to Reducer with the data
    dispatch({ type: SET_EVENTS_METADATA, eventsMetaData: loadedEventMetadata })
  }
}
