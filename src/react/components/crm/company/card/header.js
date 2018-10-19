import React from 'react';
import { CardHeader } from '@material-ui/core';

const CrmCompanyCardHeader = (props) => {
  const { icon, title } = props
    return (
      <CardHeader
        avatar={
          <i className="material-icons">
            { icon }
          </i>
        }
        title={title}
      />
    )
}

export default CrmCompanyCardHeader
