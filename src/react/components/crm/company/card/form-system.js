import React from 'react';
import { Card, CardContent, Typography, TextField } from '@material-ui/core';
import CrmCompanyCardSystemHeader from './header-system'
/**
 * Company card.
 */
const CrmCompanyFormSystem = (props) => {
    const { id, vid, uuid, status, created, changed } = props

    const _created = new Date(created*1000);
    const _createdDefault = `${_created.getFullYear()}-${("0" + _created.getMonth() + 1).slice(-2)}-${("0" + _created.getDate()).slice(-2)}`
    const _changed = new Date(changed*1000);
    const _changedDefault = `${_changed.getFullYear()}-${("0" + _changed.getMonth() + 1).slice(-2)}-${("0" + _changed.getDate()).slice(-2)}`

    console.log(_changedDefault)
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
            <div>
              <TextField
                id="created"
                label="Date de création"
                type="date"
                defaultValue={ _createdDefault }
                onChange=""
              />
            </div>
            <div>
              <TextField
                id="changed"
                label="Date de dernière modification"
                type="date"
                defaultValue={ _changedDefault }
                onChange=""
              />
            </div>
          </CardContent>
        </Card>
    )
}

export default CrmCompanyFormSystem
