export enum UserStatus {
  Normal
}

export interface IUserModel {
  name: string;
  roles: string[];
  type: string;
  nickName: string;
  password: string;
  email: string;
  createAt: number;
  status: UserStatus;
}

export interface IUserMetaModel {
  id: number;
  userId: number;
  key: string;
  value: any;
}
