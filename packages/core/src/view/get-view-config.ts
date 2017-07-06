import { cloneDeep, has } from 'lodash'

import { ICollectionOptions } from '../interface/index'

export function getViewConfig(config: ICollectionOptions) {
  let backOptions = cloneDeep(config)
  backOptions.id = backOptions.id + '_view'
  if (backOptions.local) {
    backOptions.local.name = backOptions.local.name + '_view'
  }
  if (backOptions.remote) {
    backOptions.remote.name = backOptions.remote.name + '_view'
  }

  return backOptions
}
