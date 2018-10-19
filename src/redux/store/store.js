import { createStore, applyMiddleware } from 'redux'
import { appReducers, initialState } from '../reducers'
import { loggingMiddleware, syncMiddleware } from '../middleware'

export const store = createStore(
  appReducers,
  initialState,
  applyMiddleware(
    loggingMiddleware,
    syncMiddleware
  )
)
