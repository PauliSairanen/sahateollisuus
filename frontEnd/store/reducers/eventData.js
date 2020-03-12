// Do data fetch in here

//__________ Function that gets all data from the server __________
async function getAllData() {
  try {
    let response = await fetch('https://sahat.lamk.fi/findall')
    let responseJson = await response.json()
    // console.log(responseJson)
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

// Get all data from server
const allEventData = getAllData()

// Distribute the data from all data
const aboutScreenDataFromAPI = allEventData.about
const participantsDataFromAPI = allEventData.participants
const programmeDataFromAPI = allEventData.programme
const speakersDataFromAPI = allEventData.speakers
const sponsorsDataFromAPI = allEventData.sponsors

console.log('This is about screen data')
console.log('__________________________________________')
console.log(aboutScreenDataFromAPI)

console.log('This is speakers data')
console.log('__________________________________________')
console.log(speakersDataFromAPI)

// Set the data as initial state
const initialState = {
  aboutScreenData: aboutScreenDataFromAPI,
  participantsData: participantsDataFromAPI,
  programmeData: programmeDataFromAPI,
  speakersData: speakersDataFromAPI,
  sponsorsData: sponsorsDataFromAPI,
}

const eventDataReducer = (state = initialState, action) => {
  return state
}

export default eventDataReducer