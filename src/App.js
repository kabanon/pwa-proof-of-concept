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
// CRM Company - View
import CrmCompanyFull from './react/components/crm/company/full'

import CrmCompanySyncComponent from './react/components/sync/crm/company'

import './App.css';

/**
 * Our application.
 *
 * - Manage routing with BrowserRouter
 * - Manage global UI
 */
class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <div className="App">
            <Header />
            <div>
              <Route exact path="/sync/crm/company" component={CrmCompanySyncComponent}/>
              <Route exact path="/crm/company" component={CrmCompanyList}/>
              <Route exact path="/crm/company/:id" component={CrmCompanyFull}/>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
