import { Currency } from "./order";

// 订单商品
export interface IOrderItem {
  itemId: string;  // 商品 id
  orderId: string; // 订单 id
  customerId: any; // 客户 id

  properties: any; // 定制信息

  // 价格相关
  subTotal: number; // 总价
  total: number; // 应付
  currency: Currency; // 货币
  quantity: number; // 数量

  coupon: any; // 优惠券
  adjustPrice: number; // 减价
  adjustUser: any; // 减价责任人
}
