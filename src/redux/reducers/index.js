import { combineReducers } from 'redux'

import { user, user_default_state } from './user'
import { sync_crm_default_state , sync_crm } from './crm'
import { search, search_default_state } from './search'

export const appReducers = combineReducers({
  user: user,
  sync: sync_crm,
  search: search,
})

export const initialState = {
  user: user_default_state,
  sync: {
    crm: sync_crm_default_state
  },
  search: search_default_state
}
