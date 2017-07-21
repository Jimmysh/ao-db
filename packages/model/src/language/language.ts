// 语言

export interface ILanguage {
  name: string; // 名字
  rtl: boolean; // 阅读是否从右向左
  countryId: string; // 默认国家 id
  currencyId: string; // 默认货币 id
  enabled: boolean; // 是否启用
  order: number; // 排序
}
