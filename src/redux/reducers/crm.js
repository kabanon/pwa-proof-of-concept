import {
  SET_SYNC_CRM_COMPANY_STATUS
} from '../actions/actions.js'

import {
  SYNC_STATUS_WAITING
} from '../../const'

const sync_crm_company_ts = localStorage.getItem("sync_crm_company")
const sync_crm_people_ts = localStorage.getItem("sync_crm_people")

export const sync_crm_default_state = {
  company: {
    status: SYNC_STATUS_WAITING,
    ts: (sync_crm_company_ts === null) ? 0 : Number(sync_crm_company_ts),
  },
  people: {
    status: SYNC_STATUS_WAITING,
    ts: (sync_crm_people_ts === null) ? 0 : Number(sync_crm_company_ts),
  },
}

export const sync_crm = (state = sync_crm_default_state, action) => {
  switch (action.type) {
    case SET_SYNC_CRM_COMPANY_STATUS:
      return {
        ...state,
        company:{
          status: action.status,
          ts: state.crm.company.ts
        }
        // status: action.status
      }
    default:
      return state
  }
}
