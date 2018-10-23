import { combineReducers } from 'redux'

import { user, user_default_state } from './user'
import { sync_default_state , sync } from './sync'
import { search, search_default_state } from './search'

export const appReducers = combineReducers({
  user: user,
  sync: sync,
  search: search,
})

export const initialState = {
  user: user_default_state,
  sync: sync_default_state,
  search: search_default_state
}
