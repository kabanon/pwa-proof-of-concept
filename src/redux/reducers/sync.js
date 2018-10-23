import { SET_SYNC_STATUS } from '../actions/actions.js'
import { SYNC_STATUS_WAITING } from '../../const'

export const sync_default_state = {
  status: SYNC_STATUS_WAITING,
  action: false,
}

export const sync = (state = sync_default_state, action) => {
  switch (action.type) {
    case SET_SYNC_STATUS:
      console.log({
        ...state,
        status: action.status,
        action: action.action
      })
      return {
        ...state,
        status: action.status,
        action: action.action
      }

    default:
      return state
  }
}
