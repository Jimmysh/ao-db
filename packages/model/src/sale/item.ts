import { ICollectionOptions } from 'ao-db-core';
export interface ISaleItem {
  itemId: string; // item id
  cart: {
    min: number,
    max: number,
    step: number
  };
  // seo
  description: string;
  keywords: string[];
  title: string;
  //
  pictures: string[];
  services: string[];
  properties: { default: any, values: string[] }[];
}

export const saleItemConfig: ICollectionOptions = {
  id: 'sale.item',
  model: {
  }
};
