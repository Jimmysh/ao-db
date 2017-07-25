// sku 库存生产批次模板，用于计算成本，记录信息，追踪质量问题

export interface IItemSkuStockBatchModel {
  unitCost: number; // 单件成本
  unitCostMeta: any; // 单件成本 meta 详情
  createAt: number;
}
