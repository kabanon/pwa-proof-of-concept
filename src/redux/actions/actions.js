/*
 * action types
 */
export const SET_USER_STATUS = 'SET_USER_STATUS'
export const SET_SEARCH_CONTEXT = 'SET_SEARCH_CONTEXT'
export const SET_SYNC_STATUS = 'SET_SYNC_STATUS'
/*
 *
 */
export function setUserStatus(status) {
  return { type: SET_USER_STATUS, status }
}
/*
 *
 */
export function setSearchContext(context) {
  return { type: SET_SEARCH_CONTEXT, context:context }
}
/*
 *
 */
export function setSyncStatus(status) {
  return { type: SET_SYNC_STATUS, status:status.status, action: status.action }
}
