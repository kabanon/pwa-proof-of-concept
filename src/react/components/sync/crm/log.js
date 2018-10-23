import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import './log.css'
/**
 * Sync log.
 */
const SyncComponentLog = (props) => {
  const { sync, logs, title } = props
  let status_message, progress, message
  let icon = 'cloud_download'

  // Status message
  if (!navigator.onLine) {
    progress = 0
    icon = 'cloud_off'
    message = 'You must be connected in to synchronize the data.'
  }
  else if (sync === 'running') {
    status_message = 'Synchronization in progress'
  }
  else if (sync === 'failed') {
    progress = 0
    icon = 'sync_problem'
    message = 'Synchronization completed but problems were detected.'
  }
  else if (sync === 'finished') {
    progress = 100
    icon = 'cloud_done'
    status_message = 'Synchronization is completed'
  }

  const log = logs.map( (item, key) =>
    <li key={key}>{ item }</li>
  );

  let progress_bar = <LinearProgress color="secondary" />
  if (progress >= 0) {
    progress_bar = <LinearProgress color="secondary" variant="determinate" value={progress} />
  }

  return (
    <div>
      { progress_bar }
      <p>
        <i className="material-icons">
          { icon }
        </i>
      </p>
      <Typography variant="headline" component="h3" align="center">
        { title }
      </Typography>
      <p>
        { status_message }
      </p>
      <p>
        { message }
      </p>
      <pre>
        <ul className="sync-log">
          { log }
        </ul>
      </pre>
    </div>

  )
}

export default SyncComponentLog
