// import { SET_SYNC_CRM_COMPANY_STATUS, setUserStatus, setSyncCrmCompanyStatus } from '../../redux/actions/actions'
// import { SYNC_STATUS_RUNNING } from '../../const'
// import { CrmCompanySync } from '../../utils/crm_sync'

export const loggingMiddleware = (store) => (next) => (action) => {
  next(action);
}

export const syncMiddleware = store => next => action => {
  // call the next function
  next(action);
}
