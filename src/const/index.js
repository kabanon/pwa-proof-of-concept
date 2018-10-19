const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

let API_HOST
if (isLocalhost) {
  API_HOST = 'http://localhost:3000'
}
else {
  API_HOST = 'https://demo-pwa.i-com.fr/'
}

export const API_URL = `${API_HOST}/api/v1`
export const API_URL_CRM_COMPANY = `${API_URL}/company.json`
export const API_DEFAULT_REQUEST_PARAMS = {timeout: 10000,}
export const API_DEFAULT_LIMIT = 50
export const SEARCH_PLACEHOLDER = {'crmCompany': 'Companies',}
export const SEARCH_DEFAULT_SKIP = 0
export const SEARCH_DEFAULT_LIMIT = 24
export const SEARCH_DEFAULT_SEARCH = ''
export const SEARCH_DEFAULT_SCOPE = 'project'
export const SYNC_STATUS_WAITING = 'SYNC_STATUS_WAITING'
export const SYNC_STATUS_RELOAD = 'SYNC_STATUS_RELOAD'
export const SYNC_STATUS_RUNNING = 'SYNC_STATUS_RUNNING'
