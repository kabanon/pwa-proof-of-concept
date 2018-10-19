import {
  SET_SEARCH_CONTEXT
} from '../actions/actions.js'

import {
  SEARCH_DEFAULT_SKIP,
  SEARCH_DEFAULT_LIMIT,
  SEARCH_DEFAULT_SEARCH,
  SEARCH_DEFAULT_SCOPE
} from '../../const'

const default_search = {
  skip: SEARCH_DEFAULT_SKIP,
  limit: SEARCH_DEFAULT_LIMIT,
  search: SEARCH_DEFAULT_SEARCH,
}

export const search_default_state = {
  scope: SEARCH_DEFAULT_SCOPE,
  context: {
    project: {
      ...default_search
    },
    crmCompany: {
      ...default_search
    },
    crmPeople: {
      ...default_search
    }
  }

}

export const search = (state = search_default_state, action) => {
  switch (action.type) {
    case SET_SEARCH_CONTEXT:
      return {
        ...state,
        scope: action.context
      }

    default:
      return state
  }
}
