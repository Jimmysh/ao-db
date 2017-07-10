import { ICollectionOptions } from 'ao-db-core';

export interface IItemPropertyValueAdjustmentModel {
  propertyValueId: string; // 所属属性 id
  type: string; // 计算类型
  value: any; // 计算值,方法
}

export const itemPropertyValueAdjustmentConfig: ICollectionOptions = {
  id: 'item.property.value.adjustment',
  model: {
    propertyValueId: {
      model: 'item.property.value'
    },
    type: {
      type: 'string'
    },
    value: {
      type: 'any'
    }
  }
};
