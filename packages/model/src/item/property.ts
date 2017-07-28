import { ICollectionOptions } from 'ao-db-core';

export interface IItemPropertyModel {
  attributeId: string; // 特性Id
  defaultTo: any; // 默认值
  controllerId: string; // 控制器 id
  validation: any; // 验证器配置
  values: any[]; // 可选值
  adjustments: any[]; // 属性影响计算

  // 配置
  isSale: boolean; // 销售属性
  isSelect: boolean; // 是否可选属性

  // 排序
  adjustmentOrder: number; // 计算排序
  displayOrder: number; // 显示排序
}

export const itemPropertyConfig: ICollectionOptions = {
  id: 'item.property',
  model: {
    attributeId: {
      model: 'product.attribute'
    },
    adjustmentOrder: {
      type: 'number',
      default: 0
    },
    displayOrder: {
      type: 'number',
      default: 0
    },
    defaultTo: {
      type: 'any'
    },
    controllerId: {
      model: 'product.attribute.controller'
    },
    validation: {
      type: 'object'
    },
    values: {
      collection: 'item.property.value',
      pk: 'attributeValueId',
      via: 'propertyId'
    },
    adjustments: {
      collection: 'item.property.adjustment',
      pk: 'attributeId',
      via: 'propertyId'
    }
  }
}
