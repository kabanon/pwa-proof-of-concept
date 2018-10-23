import React from 'react'
import { Card, CardContent, Typography, IconButton } from '@material-ui/core'
import { Link } from "react-router-dom"

import './summary.css'

/**
 * People card - Shortcut links.
 */
const CrmPeopleCardSummaryContactLinks = (props) => {
  const { href, link, title, icon } = props
  return (
    <span>
      { href &&
        <a href={href} title={title}>
          <IconButton>
            <i className="material-icons">
              {icon}
            </i>
          </IconButton>
        </a>
      }
      { link &&
        <Link to={link} title={title}>
          <IconButton>
            <i className="material-icons">
              {icon}
            </i>
          </IconButton>
        </Link>
      }
    </span>
  )
}
/**
 * People card.
 */
const CrmPeopleCardSummary = (props) => {
    //const { ismobile, tel, email, view, edit, del, id } = props
    const { ismobile, isMobileiOS, first_name, last_name, tel, email, view, del, id } = props
    // Generate links.
    const links = {
      tel: `tel:${tel}`,
      sms: `sms:${tel}`,
      email: `mailto:${email}`,
      view: `/crm/people/${id}`,
      edit: `/crm/people/${id}/edit`,
      delete: `/crm/people/${id}/delete`,
      facetime: `facetime:${tel}`,
    }
    //
    // Render company summary card.
    //
    return (
      <Card className="proscenia-card">
        <CardContent>
          <Typography gutterBottom variant="title" component="h2">
            { first_name } { last_name }
          </Typography>
          { tel && ismobile &&
            <CrmPeopleCardSummaryContactLinks href={links.tel} title="Appeler" icon="smartphone" />
          }
          { tel && ismobile &&
            <CrmPeopleCardSummaryContactLinks href={links.sms} title="Envoyer un SMS" icon="textsms" />
          }
          { tel && isMobileiOS &&
            <CrmPeopleCardSummaryContactLinks href={links.facetime} title="Facetime" icon="face" />
          }
          { email &&
            <CrmPeopleCardSummaryContactLinks href={links.email} title="Envoyer un email" icon="mail_outline" />
          }
          { view &&
            <CrmPeopleCardSummaryContactLinks link={links.view} title="Afficher" icon="info" />
          }
          {
            /*
            { edit && navigator.onLine &&
            <CrmPeopleCardSummaryContactLinks link={links.edit} title="Mettre à jour" icon="edit" />
            }
            */
          }
          { del && navigator.onLine &&
            <CrmPeopleCardSummaryContactLinks link={links.delete} title="Supprimer" icon="delete" />
          }
        </CardContent>
      </Card>
    )
}

export default CrmPeopleCardSummary
