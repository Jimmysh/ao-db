import { AoDBNode } from '../ao-db-node'
import { INodeCollectionOptions } from '../interface'
import { isEqual } from 'lodash'

export class SecurityPlugin {
  constructor(
    private db: AoDBNode
  ) {
    this.db.config.collections
      .forEach(async opt => {
        try {
          await this.sync(opt.id)
        } catch (error) {
          console.log('[SecurityPlugin]', error)
        }
      })
  }

  async sync(id: string) {
    const db = this.db.collection.get(id)
    const config: INodeCollectionOptions = db.config
    if (!config.security) {
      return
    }
    const security = await db.remote.getSecurity()
    const needUpdate = !isEqual(security, config.security)
    if (needUpdate) {
      await db.remote.putSecurity(config.security)
    }
  }
}
