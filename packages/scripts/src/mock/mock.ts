import { MockActionType, MockConfig } from './interface';

import { createMock } from './create';
import { removeMock } from './remove';

export function mock(config: MockConfig) {
  switch (config.action) {
    case MockActionType.Import:
      return createMock(config);
    case MockActionType.Remove:
      return removeMock(config);
    default:
      return Promise.reject('config 参数错误');
  }
}
