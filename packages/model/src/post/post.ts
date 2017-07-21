import { IElementModel } from '../element/element';

export enum PostStatus {
  Publish, // 发布
  Draft // 草稿
}

export enum PostType {
  Page, // 页面
  Post // 文章
}

export interface IPostModel {
  author: string; // 作者
  content: IElementModel[]; // 正文
  title: string; // 标题
  status: PostStatus; // 状态
  parent: any; // 父级, 页面时使用
  order: number; // 排序
  type: PostType; // 类型
  publishAt: number; // 发布时间
  createAt: number; // 创建时间
  updatedAt: number; // 修改时间
  categories: string[]; // 分类
}
