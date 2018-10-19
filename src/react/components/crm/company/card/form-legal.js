import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CrmCompanyCardLegalHeader from './header-legal'
/**
 * Company card.
 */
const CrmCompanyFormLegal = (props) => {
    const { ape, licence, siret, tva, juridic } = props
    //
    // Render company summary card.
    //
    return (
        <Card>
          <CrmCompanyCardLegalHeader />
          <CardContent>
            { ape &&
              <div>
                <Typography align="left" color="textSecondary">
                  Code APE
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { ape }
                </Typography>
              </div>
            }
            { licence &&
              <div>
                <Typography align="left" color="textSecondary">
                  Numéro de Licence
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { licence }
                </Typography>
              </div>
            }
            { siret &&
              <div>
                <Typography align="left" color="textSecondary">
                  SIRET
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { siret }
                </Typography>
              </div>
            }
            { tva &&
              <div>
                <Typography align="left" color="textSecondary">
                  Numéro de TVA
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { tva }
                </Typography>
              </div>
            }
            { juridic &&
              <div>
                <Typography align="left" color="textSecondary">
                  Forme juridique
                </Typography>
                <Typography align="left" component="p" gutterBottom>
                  { juridic }
                </Typography>
              </div>
            }
          </CardContent>
        </Card>
    )
}

export default CrmCompanyFormLegal
