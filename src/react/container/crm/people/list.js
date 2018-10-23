import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSearchContext } from '../../../../redux/actions/actions'
import CrmPeopleCardSummary from '../../../components/crm/people/card/summary'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactPaginate from 'react-paginate';
import MobileDetect  from 'mobile-detect'
import { Link } from "react-router-dom";

import * as Database from '../../../../utils/db';

import './list.css'

/**
 * UI - People list.
 */
class CrmPeopleListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skip: this.props.skip * this.props.limit,
      limit: this.props.limit,
      loading: true,
      items: []
    }
  }
  // On mount, retrive data.
  componentDidMount() {
    this.loadData()
  }
  // Retrieve data from local database.
  loadData() {
    const { search } = this.props;
    // Query.
    Database.get()
    .then( (db) => {
      let query_search = {}
      // If value is set in search input.
      if (search !== '') {
        const regexp = new RegExp(search, 'i');
        query_search = {
          last_name: {
            '$regex': regexp
          }
        }
      }
      // Execute request (js promise)
      return db.collections.people.find(query_search).sort({last_name:1}).exec()
    })
    .then( (documents) => {
      // Update component state.
      this.setState({
        loading: false,
        items: documents
      })
    })
    .catch ( (error) => {
      // An error append. WTF ?
      console.error(error)
    })
  }
  // Pagination.
  handlePageClick = (data) => {
    window.scrollTo(0, 0)
    this.setState({
      skip: data.selected * this.props.limit
    })
  };

  // Render HTML.
  render() {
    const { scope } = this.props;
    const {loading, items, skip, limit} = this.state
    // Prepare required variables for HTML rendering.
    let progress;
    let data;
    let pagination;
    // Change search scope.
    if (scope !== 'crmPeople') {
      const changeSearchContext = this.props.changeSearchContext
      changeSearchContext('crmPeople')
    }
    // If current state loading is true (no result received from the promise).
    if (loading) {
      progress = <LinearProgress color="secondary" />
    }
    // Else, if we have no result.
    else if(!items.length) {
      progress = <LinearProgress color="secondary" variant="determinate" value={0} />
      data = (
        <div>
          <p>
            <Link to="/sync">
              No people in database. Have you synchronize the data?
            </Link>
          </p>

        </div>
      )
    }
    // We have results to display.
    else {
      // Select elements to display (with pagination).
      const _items = []
      let counter = 0
      items.forEach((item, index) => {
        if (index >= skip && counter < limit) {
          _items.push(item)
          counter++
        }
      })
      // Init pagination component.
      pagination = <ReactPaginate previousLabel={"previous"}
        nextLabel={"next"}
        breakClassName={"break-me"}
        pageCount={Math.ceil(items.length / limit)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
      // Set progress to 100%.
      progress = <LinearProgress color="secondary" variant="determinate" value={100} />


      // Mobile detect object.
      const _mobileDetect = new MobileDetect(window.navigator.userAgent)
      const isMobile = _mobileDetect.mobile()
      const isMobileiOS = _mobileDetect.is('iPhone') || _mobileDetect.is('iPad')

      // Load CRM People Summary component for each elements.
      data = _items.map((item, index) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CrmPeopleCardSummary
              id={item.get('id')}
              first_name={item.first_name}
              last_name={item.last_name}
              tel={item.get('tel')}
              email={item.get('email')}
              view={1}
              ismobile={isMobile}
              isMobileiOS={isMobileiOS}
            />
          </Grid>
        )
      })
    }
    // Render HTML.
    return(
      <Grid container spacing={8}>
        <Grid item xs={12}>
          { progress }
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="headline" component="h2" align="center">
              People
            </Typography>
          </Paper>
        </Grid>
        { data }
        <Grid item xs={12}>
          <div id="react-paginate">
            { pagination }
          </div>
        </Grid>
      </Grid>
    )
  }
}
// PropTypes for Sync Component.
CrmPeopleListContainer.propTypes = {
  scope: PropTypes.string.isRequired,
  skip: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
}
// Connect SyncComponent => State.
const mapStateToProps = state => {
  return {
    scope: state.search.scope,
    skip: state.search.context['crmPeople'].skip,
    limit: state.search.context['crmPeople'].limit,
    search: state.search.context['crmPeople'].search,
  }
}
// Connect SyncComponent => Dispatch.
const mapDispatchToProps = dispatch => {
  return {
    changeSearchContext() {
      dispatch(setSearchContext('crmPeople'))
    }
  }
}
// Redux connect component.
const CrmPeopleList = connect(mapStateToProps, mapDispatchToProps)(CrmPeopleListContainer)

export default CrmPeopleList
