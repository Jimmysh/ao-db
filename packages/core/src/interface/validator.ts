import { IModel } from './model'
import { IValidateFunction } from './validator'

export interface IValidateCallBack {
}

export interface IValidateFunction {
  (data: any): Promise<IValidateCallBack>
}

export interface IModelValidateHelper {
  register(id: string, model: IModel)
  validator(id: string): IValidateFunction
}
