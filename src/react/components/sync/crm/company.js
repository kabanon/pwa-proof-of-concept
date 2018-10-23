import React from 'react';
import axios from 'axios'
import * as Database from '../../../../utils/db';
import {API_URL_CRM_COMPANY, API_DEFAULT_REQUEST_PARAMS, API_DEFAULT_LIMIT } from '../../../../const/'
import SyncComponentLog from './log'

/**
 * Manual Sync App.
 */
class CrmCompanySyncComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sync: 'running',
      op: [],
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
    const { dispatchStatus } = this.props

    this.setState({
      op: ['Companies synchronization started.', ...this.state.op]
    })
    let requests = []
    for(let i = 0; i < 1; i++) {
      requests.push(this.getAxiosRequest(i * API_DEFAULT_LIMIT, API_DEFAULT_LIMIT))
    }
    axios.all(requests)
    .then( (responses) => {
      this.setState({
        op: ['All HTTP requests are complete.', ...this.state.op]
      })
      // Check if all request send a status 200.
      return this.checkResponses(responses)
    })
    .then( (items) => {
      this.setState({
        op: ['All HTTP requests are successfully complete.', ...this.state.op]
      })

      // Upsert items in database.
      Database.get()
      .then( (db) => {
        this.setState({
          op: ['Local company storage synchronization started.', ...this.state.op]
        })
        return this.upsertItems(db, items)
      })
      .then( (data) => {
        // Data are successfully upserted in db.
        this.setState({
          sync: 'finished',
          op: ['Local company storage synchronization complete.', ...this.state.op]
        })
        if (Notification.permission === "granted") {
          new Notification("PWA POC", {body: "Company sync complete"});
          // const notification = new Notification("PWA POC", {body: "Company sync complete"});
          // setTimeout(notification.close.bind(notification), 4000);
        }
      })
      .catch( (error) => {
        dispatchStatus('company')
        // An error has occurs.
        return Promise.reject(error)
      })
    })
    .catch( (error) => {
      this.setState({
        sync: 'failed',
        op: ['HTTP requests failed.', ...this.state.op]
      })
      dispatchStatus('company')
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
    const object = this
    return new Promise(
      function (resolve, reject) {
        let promises = []
        const total = items.length
        let message = `1 company to synchronize`
        if (total > 1) {
          message = `${total} companies to synchronize`
        }

        object.setState({
          op: [message, ...object.state.op]
        })

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
    const { sync, op } = this.state

    return (
      <SyncComponentLog title="Sync companies" logs={op} sync={sync} />
    )
  }
}

export default CrmCompanySyncComponent
