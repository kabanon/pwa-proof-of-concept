import React from 'react';
import axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress';
import * as Database from '../../../../utils/db';
import {API_URL_CRM_COMPANY, API_DEFAULT_REQUEST_PARAMS, API_DEFAULT_LIMIT} from '../../../../const/'


class CrmCompanySyncComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sync: 'running',
    }
  }

  componentDidMount() {
    // On mount, sync data with API if user is inline.
    if (navigator.onLine) {
      this.syncCompanyCrm()
    }
  }
  /**
   * Sync company with HTTP requests.
   */
  syncCompanyCrm() {
    let requests = []
    for(let i = 0; i < 1; i++) {
      requests.push(this.getAxiosRequest(i * API_DEFAULT_LIMIT, API_DEFAULT_LIMIT))
    }
    axios.all(requests)
    .then( (responses) => {
      // Check if all request send a status 200.
      return this.checkResponses(responses)
    })
    .then( (items) => {
      // Upsert items in database.
      Database.get()
      .then( (db) => {
        return this.upsertItems(db, items)
      })
      .then( (data) => {
        // Data are successfully upserted in db.
        this.setState({
          sync: 'finished'
        })
      })
      .catch( (error) => {
        // An error has occurs.
        return Promise.reject(error)
      })
    })
    .catch( (error) => {
      console.log(error)
    })
  }
  /**
   * Check if all HTTP responses have an OK status,
   * Return a promise with all items to upsert.
   */
  checkResponses(responses) {
    return new Promise(
      function (resolve, reject) {
        let items = []
        let error = false
        responses.forEach(response => {
          if (!error && response.status !== 200) {
            error = true
          }
          else {
            response.data.forEach(data => {
              items.push(data)
            })
          }
        })
        if (error) {
          reject('Request error')
        }
        else {
          resolve(items)
        }
      }
    );
  };
  /**
   * Upsert items in database.
   */
  upsertItems(db, items) {
    return new Promise(
      function (resolve, reject) {
        let promises = []
        items.forEach( (item, key) => {
          promises.push(db.collections.company.upsert(item))
        })
        // TODO - How to log error ?
        Promise.all(promises)
        .then( (data) => {
          resolve(data)
        })
        .catch( (error) => {
          reject(error)
        });
      }
    )
  }
  /**
   * Generate Axios request.
   */
  getAxiosRequest(offset, limit) {
    return axios({
       url: API_URL_CRM_COMPANY,
       method: 'get',
       params: {
         'page[offset]': offset,
         'page[limit]': limit,
       },
       ...API_DEFAULT_REQUEST_PARAMS
     })
  }
  /**
   * Render HTML.
   */
  render() {
    const { sync } = this.state
    let progress = <LinearProgress color="secondary" />
    let icon = 'sync'
    let message = 'Synchronization in progress'

    if (!navigator.onLine) {
      progress = <LinearProgress color="secondary" variant="determinate" value={0} />
      icon = 'cloud_off'
      message = 'You must be connected in to synchronize the data.'
    }
    else if (sync === 'problems') {
      progress = <LinearProgress color="secondary" variant="determinate" value={0} />
      icon = 'sync_problem'
      message = 'Synchronization completed but problems were detected.'
    }
    else if (sync === 'finished') {
      progress = <LinearProgress color="secondary" variant="determinate" value={100} />
      icon = 'cloud_done'
      message = 'Synchronization completed.'
    }

    return (
      <div>
        { progress }
        <p>
          <i className="material-icons">
            { icon }
          </i>
        </p>
        <p>
          { message }
        </p>
      </div>
    )
  }
}

export default CrmCompanySyncComponent;
