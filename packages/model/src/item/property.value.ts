import { ICollectionOptions } from 'ao-db-core';

export interface IItemPropertyModel {
  propertyId: string; // 所属属性 id
  attributeValueId: string; // 影响的产品所性 id
}

export const itemPropertyConfig: ICollectionOptions = {
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