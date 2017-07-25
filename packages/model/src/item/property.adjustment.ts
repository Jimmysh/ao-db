import { ICollectionOptions } from 'ao-db-core';

export enum AdjustmentType {
  Add, // 加
  Minus, // 减
  Multiply, // 乘
  Divide, // 除
  Function // 函数
}

export interface IItemPropertyAdjustmentModel {
  propertyId: string; // 所属属性 id
  type: AdjustmentType; // 计算类型
  value: any; // 计算值, 方法
}

export const itemPropertyAdjustmentConfig: ICollectionOptions = {
  id: 'item.property.adjustment',
  model: {
    propertyId: {
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
