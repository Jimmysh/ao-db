import { ICollectionOptions } from 'ao-db-core';

// 商品属性

export enum ItemPropertyType {
  basic, // 基础
  Accessory // 配件属性
}

export interface IItemPropertyModel {
  type: ItemPropertyType; // 类型
  attributeId: string; // 特性 id
  defaultTo: any; // 默认值

  controllerId: string; // 控制器 id
  controllerConfig: any; // 控制器配置

  validation: any; // 验证器配置

  // 可选值
  values: any[]; // 可选值
  adjustments: any[]; // 属性影响计算

  // 配件 id
  accessoryItemId: string;

  // 设置
  isSale: boolean; // 销售属性
  isSelect: boolean; // 是否可选属性

  // 排序
  adjustOrder: number; // 计算排序
  order: number; // 显示排序
}

export const itemPropertyConfig: ICollectionOptions = {
  id: 'item.property',
  model: {
    attributeId: {
      model: 'product.attribute'
    },
    adjustOrder: {
      type: 'number',
      default: 0
    },
    order: {
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
