import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class CrmPeopleSummary extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes, name, tel, email, id } = this.props;
    const link = `/crm/people/${id}`

    return (
      <Link to={link}>
        <Paper elevation={3}>
          <Typography variant="title" component="h3">
            {name}
          </Typography>
          <Typography variant="h5">
            {tel}
          </Typography>
          <Typography variant="h5">
            {email}
          </Typography>
        </Paper>
      </Link>
    )
  }
}

CrmPeopleSummary.propTypes = {
  name: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,

};

export default CrmPeopleSummary;
