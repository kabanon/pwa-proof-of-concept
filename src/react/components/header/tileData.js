// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DomainIcon from '@material-ui/icons/Domain';
import SyncIcon from '@material-ui/icons/Sync';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from "react-router-dom";

export const RootItem = (
  <div>
    <NavLink exact to="/">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
  </div>
)

export const crmListItems = (
  <div>
    <NavLink exact to="/crm/company">
      <ListItem button>
        <ListItemIcon>
          <DomainIcon />
        </ListItemIcon>
        <ListItemText primary="Companies" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/sync/crm/company">
      <ListItem button>
        <ListItemIcon>
          <SyncIcon />
        </ListItemIcon>
        <ListItemText primary="Sync" />
      </ListItem>
    </NavLink>
  </div>
);
