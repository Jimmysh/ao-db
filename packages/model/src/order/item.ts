import { Currency } from "./order";

export interface IOrderItem {
  itemId: string;
  orderId: string;
  customer: any;

  properties: any;

  subTotal: number;
  total: number;
  currency: Currency;
  quantity: number;
}
