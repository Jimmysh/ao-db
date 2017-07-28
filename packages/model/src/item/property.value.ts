import { ICollectionOptions } from 'ao-db-core';

export interface IItemPropertyValueModel {
  propertyId: string; // 所属属性 id
  attributeValueId: string; // 影响的属性值 id
  adjustments: any[];// 可选值影响计算
}

export const itemPropertyValueConfig: ICollectionOptions = {
  id: 'item.property.value',
  model: {
    propertyId: {
      model: 'item.property'
    },
    attributeValueId: {
      model: 'product.attribute.value'
    },
    adjustments: {
      collection: 'item.property.value.adjustment',
      pk: 'attributeValueId',
      via: 'propertyId'
    }
  }
};
