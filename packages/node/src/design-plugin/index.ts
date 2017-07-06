import { IDesignDoc, INodeCollectionOptions } from '../interface'
import { assign, chain, cloneDeep, difference, forEach, forIn, isEmpty, isEqual, isFunction, pick } from 'lodash'

import { AoDBNode } from '../ao-db-node'
import { functionToString } from '../util/fuction-to-string'
import { minify } from 'uglify-js'

const Babel = require('babel-standalone')
export class DesignPlugin {
  constructor(
    private db: AoDBNode
  ) {
    this.db.config.collections
      .forEach(async opt => {
        try {
          await this.sync(opt.id)
        } catch (error) {
          console.log('[DesignPlugin]', error)
        }
      })
  }
  async sync(id: string) {
    //
    const db = this.db.collection.get(id)
    const config: INodeCollectionOptions = db.config
    if (!config.design) {
      return
    }
    const dbGetIds = await db.remote.allDocs({
      startkey: '_design',
      endkey: '_design0'
    })

    const ids = chain(dbGetIds.rows)
      .filter(d => !d.id.includes('idx-'))
      .map(d => d.id)
      .value()

    const needIds = chain(config.design)
      .keys()
      .map(d => `_design/${d}`)
      .value()
    const needDeleteIds: string[] = difference(ids, needIds)

    needDeleteIds.forEach(async (id: string) => {
      const doc = dbGetIds.rows.find(d => d.id === id)
      if (doc) {
        await db.remote.remove(doc.id, doc.value.rev)
      }
    })

    forIn(config.design, async (designDoc, k) => {
      const id = `_design/${k}`
      designDoc = this.guard(designDoc)
      try {
        const doc = await db.get(id)
        const newDoc: any = assign({}, designDoc, pick(doc, ['_id', 'language', '_rev']))
        const needUpdate = !isEqual(doc, newDoc)
        if (needUpdate) {
          await db.remote.put(newDoc)
        }
      } catch (e) {
        const newDoc: any = assign({}, designDoc, { _id: id })
        await db.remote.put(newDoc)
      }
    })
    return true
  }

  guard(design: IDesignDoc) {
    design = cloneDeep(design)
    if (isFunction(design.validate_doc_update)) {
      design.validate_doc_update = functionToString(design.validate_doc_update) as any
    }

    if (!isEmpty(design.views)) {
      forIn(design.views, (v, k) => {
        forEach(['map', 'reduce'], key => {
          if (isFunction(v[key])) {
            v[key] = functionToString(v[key])
          }
        })
      })
    }
    return design
  }
}
