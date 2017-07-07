// 一对一
export interface IOneToOne {
  model: string; // 模型 id
  insert?: boolean; // 是否是链接
}
// 一对多关系
export interface IHasMany {
  collection: string; // 模型 id
  via: string; // 对应属性
  through?: string;
  pk?: string; // 自定义主键
}

export interface IValidation {
  required?: boolean; // 必须
}
export type IRelationship = IOneToOne & IHasMany;

export interface IStringValidation extends IValidation {
  type: 'string';
  email?: boolean; // email
  maxLength?: number; // 最大长度
  minLength?: number; // 最小长度
  in?: string[]; // 属于
  notIn?: string[]; // 不属于
  regex?: RegExp; // 满足正则
  default?: string;
}
export interface INumberValidation extends IValidation {
  type: 'number';
  max?: number; // 最大值
  min?: number; // 最小值
  in?: number[]; // 属于
  notIn?: number[]; // 不属于
  default?: number;
}
export interface IBooleanValidation extends IValidation {
  type: 'boolean';
  default?: boolean;
}
export interface IArrayValidation extends IValidation {
  type: 'array';
}
export interface IAnyValidation extends IValidation {
  type: 'any';
}

export interface IDBOption {
  search?: boolean;
}
export interface IFormOption {
  title?: string; // 标题
  description?: string; // 介绍
}

export type ITypeValidation = INumberValidation | IStringValidation | IBooleanValidation | IArrayValidation | IAnyValidation;
export type IModeConfig = ITypeValidation & IFormOption & IDBOption;
export type IModel = {
  [name: string]: IModeConfig | IOneToOne | IHasMany
};
