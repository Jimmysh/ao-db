import { INodeCollectionOptions } from 'ao-db-node'
import { IUserCtx } from '../../../interface'

export const basic: INodeCollectionOptions = {
  id: 'sync-design.basic',
  remote: {
    name: 'sync-design.basic'
  },
  security: {
    admins: {
      names: [],
      roles: [
        '_admin'
      ]
    },
    members: {
      names: [],
      roles: [
        'user'
      ]
    }
  },
  index: {
    username: 'username',
    email: 'email',
    deleted: '_deleted'
  },
  design: {
    ACL: {
      validate_doc_update: (newDoc: PouchDB.Core.Document<any>, oldDoc: PouchDB.Core.Document<any>, userCtx: IUserCtx, secObj: any) => {
        if (newDoc._deleted === true) {
          if ((userCtx.roles.indexOf('_admin') !== -1) || (userCtx.username === oldDoc.username)) {
            return
          } else {
            throw ({ forbidden: 'Only admins may delete other user docs.' })
          }
        }
      }
    }
  }
}
