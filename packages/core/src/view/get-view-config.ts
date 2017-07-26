import { cloneDeep, has } from 'lodash';

import { ICollectionOptions } from '../interface/index';

export function getViewConfig(config: ICollectionOptions) {
  let backOptions = cloneDeep(config);
  backOptions.id = `view_${backOptions.id}`;
  if (backOptions.local) {
    backOptions.local.name = `view_${backOptions.local.name}`;
  }
  if (backOptions.remote) {
    backOptions.remote.name = `view_${backOptions.remote.name}`;
  }
  return backOptions;
}
