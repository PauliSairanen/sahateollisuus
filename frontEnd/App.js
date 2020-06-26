import React, { useEffect } from 'react'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import SplashScreen from 'react-native-splash-screen'

import EventNavigator from './navigation/EventNavigator'
import eventDataReducer from './store/reducers/eventData'

// Add additional reducers to here, to use in the app
const rootReducer = combineReducers({
  eventData: eventDataReducer
})

console.disableYellowBox = true  // Disables the yellow warnings

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
export default function App() {

  useEffect(() => {
    setTimeout(() => SplashScreen.hide() , 1000)
  },[])

  return (
    <Provider store={store}>
      <EventNavigator />
    </Provider>
  )
}

