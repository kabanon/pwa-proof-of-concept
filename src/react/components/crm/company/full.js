import React from 'react';
import * as Database from '../../../../utils/db';
import LinearProgress from '@material-ui/core/LinearProgress';
import MobileDetect  from 'mobile-detect'
import Grid from '@material-ui/core/Grid';

import CrmCompanyCardSummary from './card/summary'
import CrmCompanyCardContact from './card/content-contact'
import CrmCompanyCardLegal from './card/content-legal'
import CrmCompanyCardSystem from './card/content-system'

class CrmCompanyFull extends React.Component {
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
      return db.collections.company.findOne(search).exec()
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

      progress = <LinearProgress color="secondary" variant="determinate" value={100} />
      content = <Grid container spacing={8}>
        <Grid item xs={12}>
          <CrmCompanyCardSummary
            id={doc.id}
            name={doc.name}
            tel={doc.tel}
            email={doc.email}
            edit={1}
            ismobile={_mobileDetect.mobile()}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmCompanyCardContact
            id={doc.id}
            street={doc.address.line1}
            complementary_street={doc.address.line2}
            postal_code={doc.address.postal_code}
            city={doc.address.city}
            country={doc.address.country}
            responsible={doc.responsible}
            tel={doc.tel} md={4}
            fax={doc.fax}
            email={doc.email}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmCompanyCardLegal
            id={doc.id}
            ape={doc.ape}
            licence={doc.licence}
            siret={doc.siret}
            tva={doc.tva}
            juridic={doc.juridic}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CrmCompanyCardSystem
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

export default CrmCompanyFull;
