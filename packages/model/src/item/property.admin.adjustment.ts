import { AdjustmentType } from './property.adjustment';
import { ICollectionOptions } from 'ao-db-core';

// 商品管理人员可见调整器，例如估算成本
export interface IItemPropertyAdminAdjustmentModel {
  propertyId: string; // 所属属性 id
  propertyValueId: string; // 影响的属性值 id
  type: AdjustmentType; // 计算类型
  value: any; // 计算值, 方法
}

export const itemPropertyAdminAdjustmentConfig: ICollectionOptions = {
  id: 'item.property.adjustment',
  model: {
    propertyId: {
      model: 'item.property'
    },
    propertyValueId: {
      model: 'item.property'
    },
    type: {
      type: 'string'
    },
    value: {
      type: 'any'
    }
  }
};
