import React from 'react'
import { Card, CardContent, Typography, IconButton } from '@material-ui/core'
import { Link } from "react-router-dom"

import './summary.css'

/**
 * Company card - Shortcut links.
 */
const CrmCompanyCardSummaryContactLinks = (props) => {
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
 * Company card.
 */
const CrmCompanyCardSummary = (props) => {
    //const { ismobile, tel, email, view, edit, del, id } = props
    const { ismobile, tel, email, view, del, id } = props
    // Generate links.
    const links = {
      tel: `tel:${tel}`,
      sms: `sms:${tel}`,
      email: `mailto:${email}`,
      view: `/crm/company/${id}`,
      edit: `/crm/company/${id}/edit`,
      delete: `/crm/company/${id}/delete`,
    }
    //
    // Render company summary card.
    //
    return (
      <Card className="proscenia-card">
        <CardContent>
          <Typography gutterBottom variant="title" component="h2">
            { props.name }
          </Typography>
          { tel && ismobile &&
            <CrmCompanyCardSummaryContactLinks href={links.tel} title="Appeler" icon="smartphone" />
          }
          { tel && ismobile &&
            <CrmCompanyCardSummaryContactLinks href={links.sms} title="Envoyer un SMS" icon="textsms" />
          }
          { email &&
            <CrmCompanyCardSummaryContactLinks href={links.email} title="Envoyer un email" icon="mail_outline" />
          }
          { view &&
            <CrmCompanyCardSummaryContactLinks link={links.view} title="Afficher" icon="info" />
          }
          {
            /*
            { edit && navigator.onLine &&
            <CrmCompanyCardSummaryContactLinks link={links.edit} title="Mettre à jour" icon="edit" />
            }
            */
          }
          { del && navigator.onLine &&
            <CrmCompanyCardSummaryContactLinks link={links.delete} title="Supprimer" icon="delete" />
          }
        </CardContent>
      </Card>
    )
}

export default CrmCompanyCardSummary
