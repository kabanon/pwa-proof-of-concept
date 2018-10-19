import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CrmCompanyCardContactHeader from './header-contact'
/**
 * Company card.
 */
const CrmCompanyFormContact = (props) => {
    const { street, complementary_street, postal_code, city, country, responsible, tel, fax, email } = props
    //
    // Render company summary card.
    //
    return (
        <Card>
          <CrmCompanyCardContactHeader />
          <CardContent>
            { responsible &&
              <div>
                <Typography align="left" color="textSecondary">
                  Responsable
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { responsible }
                </Typography>
              </div>
            }
            { city &&
              <div>
                <Typography align="left" color="textSecondary">
                  Adresse
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { street } { complementary_street } - { postal_code } { city } ({ country })
                </Typography>
              </div>
            }

            { tel &&
              <div>
                <Typography align="left" color="textSecondary">
                  Tel
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { tel }
                </Typography>
              </div>
            }

            { fax &&
              <div>
                <Typography align="left" color="textSecondary">
                  Fax
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { fax }
                </Typography>
              </div>
            }

            { email &&
              <div>
                <Typography align="left" color="textSecondary">
                  Email
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { email }
                </Typography>
              </div>
            }
          </CardContent>
        </Card>
    )
}

export default CrmCompanyFormContact
