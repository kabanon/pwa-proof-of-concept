import React, { Component }  from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


import { RootItem, crmListItems, syncItem } from './tileData';
// import { NavLink } from "react-router-dom";
// import {SEARCH_PLACEHOLDER} from '../../../const'

import './navigation.css'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
      display: 'block',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class NavigationComponent extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    drawer: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      'drawer': open,
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    //const { classes, notification, search } = this.props;
    const { classes, notification } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const sideList = (
      <div className={classes.list}>
        <List>{RootItem}</List>
        <Divider />
        <List>{crmListItems}</List>
        <Divider />
        <List>{syncItem}</List>
      </div>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={notification} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            { /*}
              <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
              </div>
            */ }
            { /*
              <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder={SEARCH_PLACEHOLDER[search]}
                disableUnderline
                classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
                }}
              />
              </div
              <div className={classes.sectionDesktop}>
              <NavLink to="/test/2">
                <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={17} color="secondary">
              <NotificationsIcon />
              </Badge>
                </IconButton>
              </NavLink>
              </div>>
            */ }
          </Toolbar>
        </AppBar>
        {renderMobileMenu}

        <Drawer open={this.state.drawer} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>

      </div>
    );
  }
}

NavigationComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
};


// Connect SyncComponent => State.
const mapStateToProps = state => {
  return {
    user: {
      status: state.user.status,
      uuid: 'AA-BB-CC-DD'
    },
    search: state.search.scope,
    notification: 4,
  }
}

// https://material-ui.com/demos/drawers/
// Temporary drawer

const Navigation = connect(mapStateToProps)(NavigationComponent)

export default withStyles(styles)(Navigation);
