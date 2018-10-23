import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CrmCompanySyncComponent from '../../components/sync/crm/company'
import CrmPeopleSyncComponent from '../../components/sync/crm/people'
/**
 * UI - Sync container.
 */
class SyncContainer extends Component {
  render() {
    return(
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <LinearProgress color="secondary" variant="determinate" value={0} />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="headline" component="h2" align="center">
              Sync
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper square={true}>
            <CrmCompanySyncComponent />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper square={true}>
            <CrmPeopleSyncComponent />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default SyncContainer
