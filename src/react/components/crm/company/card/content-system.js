import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CrmCompanyCardSystemHeader from './header-system'
/**
 * Company card.
 */
const CrmCompanyCardSystem = (props) => {
    const { id, vid, uuid, status, created, changed } = props
    //
    // Render company summary card.
    //
    return (
        <Card>
          <CrmCompanyCardSystemHeader />
          <CardContent>
            { id &&
              <div>
                <Typography align="left" color="textSecondary">
                  ID
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { id }
                </Typography>
              </div>
            }
            { vid &&
              <div>
                <Typography align="left" color="textSecondary">
                  VID
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { vid }
                </Typography>
              </div>
            }
            { uuid &&
              <div>
                <Typography align="left" color="textSecondary">
                  UUID
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { uuid }
                </Typography>
              </div>
            }
            { status &&
              <div>
                <Typography align="left" color="textSecondary">
                  Status
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { status }
                </Typography>
              </div>
            }
            { created &&
              <div>
                <Typography align="left" color="textSecondary">
                  Created
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { created }
                </Typography>
              </div>
            }
            { changed &&
              <div>
                <Typography align="left" color="textSecondary">
                  Changed
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { changed }
                </Typography>
              </div>
            }
          </CardContent>
        </Card>
    )
}

export default CrmCompanyCardSystem
