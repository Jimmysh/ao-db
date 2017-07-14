import { ICollectionOptions } from 'ao-db-core';

export enum OrderStatus {
  Pending, // 等待中
  Processing, // 进行中
  Cancelled, // 已取消
  Complete // 已完成
}

export enum PaymentStatus {
  Pending, // 等待付款
  Paid, // 已支付
  Refunded, // 退款
  PartialRefunded // 部分退款
}

export enum PaymentMethod {
  alipay, // 支付宝 APP 支付
  alipay_wap, // 支付宝手机网页支付
  alipay_pc_direct, // 支付宝电脑网站支付
  alipay_qr, // 支付宝当面付，即支付宝扫码支付
  bfb, // 百度钱包移动快捷支付，即百度钱包 APP 支付
  bfb_wap, // 百度钱包手机网页支付
  cp_b2b, // 银联企业网银支付，即 B2B 银联 PC 网页支付
  upacp, // 银联支付，
  upacp_wap, // 银联手机网页支付
  upacp_pc, // 银联网关支付，即银联 PC 网页支付
  wx, // 微信 APP 支付
  wx_pub, // 微信公众号支付
  wx_pub_qr, // 微信公众号扫码支付
  wx_wap, // 微信 WAP 支付（此渠道仅针对特定客户开放）
  wx_lite, // 微信小程序支付
  yeepay_wap, // 易宝手机网页支付
  jdpay_wap, // 京东手机网页支付
  fqlpay_wap, // 分期乐支付
  qgbc_wap, // 量化派支付
  cmb_wallet, // 招行一网通
  applepay_upacp, // Apple Pay
  mmdpay_wap, // 么么贷
  qpay // QQ 钱包支付
}

// 货币
export enum Currency {
  cny
}

export interface IOrderModel {
  status: OrderStatus;  // 订单状态
  orderNo: string; // 订单号

  subTotal: number; // 原价
  total: number; // 成交价
  currency: Currency;  // 货币

  customer: any; // 用户
  address: any; // 配送地址
  phone: number; // 电话

  subject: string; // 订单标题
  body: string; // 订单信息
  description; // 订单附加说明

  paymentStatus: PaymentStatus; // 支付状态
  paymentMethod: PaymentMethod; // 支付途径
  transactionNo: string;  // 渠道流水号

  // 订购的产品
  item: any;

  createAt: number; // 创建时间
  expireAt: number; // 订单过期时间
  paidAt: number; // 支付时间
  shippedAt: number; // 发货时间
  deliveredAt: number; // 交货时间
  completeAt: number; // 完成时间
}

export const orderConfig: ICollectionOptions = {
  id: 'order'
}
