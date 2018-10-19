import {
  SET_USER_STATUS
} from '../actions/actions.js'



export const user_default_state = {
  status: navigator.onLine,
  uid: false
}

export const user = (state = user_default_state, action) => {
  switch (action.type) {
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      }
    default:
      return state
  }
}
