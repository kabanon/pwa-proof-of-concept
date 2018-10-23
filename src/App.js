import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from "react-router-dom";


import CssBaseline from '@material-ui/core/CssBaseline';

// UI - Header
import Header from './react/components/header'
// CRM Company - List
import CrmCompanyList from './react/container/crm/company/list'
// CRM People - List
import CrmPeopleList from './react/container/crm/people/list'
// CRM Company - View
import CrmCompanyFull from './react/components/crm/company/full'
// CRM People - View
import CrmPeopleFull from './react/components/crm/people/full'


import SyncContainer from './react/container/sync'

import './App.css';

/**
 * Our application.
 *
 * - Manage routing with BrowserRouter
 * - Manage global UI
 */
class App extends Component {

  componentDidMount() {
    // At first, let's check if we have permission for notification
    // If not, let's ask for it
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <div className="App">
            <Header />
            <div>
              <Route exact path="/sync" component={SyncContainer}/>
              <Route exact path="/crm/company" component={CrmCompanyList}/>
              <Route exact path="/crm/company/:id" component={CrmCompanyFull}/>
              <Route exact path="/crm/people" component={CrmPeopleList}/>
              <Route exact path="/crm/people/:id" component={CrmPeopleFull}/>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
