export const FETCH_ALL_DATA = 'FETCH__ALL_DATA'

export const fetchAllData = () => {
  return async dispatch => {
    const response = await fetch('https://sahat.lamk.fi/findall')
    const responseData = await response.json()
    dispatch({type: FETCH_ALL_DATA})
  }
}
