import React from 'react';
import * as Database from '../../../../utils/db';
import LinearProgress from '@material-ui/core/LinearProgress';
import MobileDetect  from 'mobile-detect'
import Grid from '@material-ui/core/Grid';

import CrmPeopleCardSummary from './card/summary'
import CrmPeopleCardContact from './card/content-contact'
import CrmPeopleCardSystem from './card/content-system'

class CrmPeopleFull extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      failed: false,
      doc: {}
    }
  }

  componentDidMount() {
    this.loadData()
  }
  /**
   * Load data from internal database.
   */
  loadData() {
    Database.get()
    .then( (db) => {
      const search = {
        id: Number(this.props.match.params.id)
      }
      return db.collections.people.findOne(search).exec()
    })
    .then( (doc) => {
      this.setState({
        loading: false,
        doc: doc
      })
    })
    .catch ( (error) => {
      this.setState({
        loading: false,
        failed: error
      })
    })
  }
  /**
   * Render HTML.
   */
  render() {
    let progress, content;
    const {loading, doc, failed} = this.state

    //
    // State : loadind data in progress.
    //
    if (loading) {
      progress = <LinearProgress color="secondary" />
      content = <Grid container spacing={8}>
        <Grid item xs={12}>
          Loading in progress.
        </Grid>
      </Grid>
    }
    //
    // State : loading data has failed.
    //
    else if (failed) {
      progress = <LinearProgress color="secondary" variant="determinate" value={0} />
      content = <Grid container spacing={8}>
        <Grid item xs={12}>
          An error occurred while retrieving data.
        </Grid>
      </Grid>
    }
    //
    // State ; Loading data is successfully finished.
    //
    else {
      // Mobile detect object.
      const _mobileDetect = new MobileDetect(window.navigator.userAgent)
      const isMobile = _mobileDetect.mobile()
      const isMobileiOS = _mobileDetect.is('iPhone') || _mobileDetect.is('iPad')

      progress = <LinearProgress color="secondary" variant="determinate" value={100} />
      content = <Grid container spacing={8}>
        <Grid item xs={12}>
          <CrmPeopleCardSummary
            id={doc.id}
            first_name={doc.first_name}
            last_name={doc.last_name}
            tel={doc.tel}
            email={doc.email}
            edit={1}
            ismobile={isMobile}
            isMobileiOS={isMobileiOS}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CrmPeopleCardContact
            id={doc.id}
            street={doc.address.line1}
            complementary_street={doc.address.line2}
            postal_code={doc.address.postal_code}
            city={doc.address.city}
            country={doc.address.country}
            manager={doc.manager}
            tel={doc.tel} md={4}
            fax={doc.fax}
            email={doc.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CrmPeopleCardSystem
            id={doc.id}
            vid={doc.vid}
            uuid={doc.uuid}
            status={doc.status}
            created={doc.created}
            changed={doc.changed}
          />
        </Grid>
      </Grid>
    }
    //
    // Render full display.
    //
    return (
      <div>
        {progress}
        {content}
      </div>
    )
  }
}

export default CrmPeopleFull;
