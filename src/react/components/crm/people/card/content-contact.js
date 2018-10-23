import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CrmPeopleCardContactHeader from './header-contact'
/**
 * People card.
 */
const CrmPeopleCardContact = (props) => {
    const { street, complementary_street, postal_code, city, country, manager, tel, fax, email } = props
    //
    // Render company summary card.
    //
    return (
        <Card>
          <CrmPeopleCardContactHeader />
          <CardContent>
            { manager &&
              <div>
                <Typography align="left" color="textSecondary">
                  Manager
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { manager }
                </Typography>
              </div>
            }
            { city &&
              <div>
                <Typography align="left" color="textSecondary">
                  Address
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { street } { complementary_street } - { postal_code } { city } ({ country })
                </Typography>
              </div>
            }

            { tel &&
              <div>
                <Typography align="left" color="textSecondary">
                  Phone
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
                  Mail
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

export default CrmPeopleCardContact
