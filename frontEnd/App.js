import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import EventNavigator from './navigation/EventNavigator'
import eventDataReducer from './store/reducers/eventData'

// Add additional reducers to here, to use in the app
const rootReducer = combineReducers({
  eventData: eventDataReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <EventNavigator />
    </Provider>
  )
}
