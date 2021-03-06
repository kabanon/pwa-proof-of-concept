
export const DB_SCHEMA_CRM_COMPANY = {
  title: 'CRM company',
  description: 'CRM company database schema',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    vid: {
      type: 'integer',
    },
    uuid: {
      type: 'string',
      primary: true,
    },
    status: {
      type: 'boolean'
    },
    name: {
      type: 'string',
      index: true,
    },
    picture: {
      type: 'string',
    },
    tel: {
      type: 'string',
      encrypted: true,
    },
    fax: {
      type: 'string',
      encrypted: true,
    },
    email: {
      type: 'string',
      encrypted: true,
    },
    address: {
      type: "object",
      properties: {
        line1: {
          type: 'string',
        },
        line2: {
          type: 'string',
        },
        postal_code: {
          type: 'integer',
        },
        city: {
          type: 'string',
        },
        country: {
          type: 'string',
        }
      }
    },
    responsible: {
      type: 'string',
      encrypted: true,
    },
    ape: {
      type: 'string',
    },
    licence: {
      type: 'string',
    },
    siret: {
      type: 'integer',
    },
    tva: {
      type: 'string',
    },
    juridic: {
      type: 'string',
    },
    created: {
      type: 'integer',
    },
    changed: {
      type: 'integer',
    },
  },
  required: ['id', 'uuid', 'name']
}
