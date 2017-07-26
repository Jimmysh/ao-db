export enum MockActionType {
  Import,
  Remove
}

export type MockConfig = {
  action: MockActionType;
  serve?: string;
  username?: string;
  password?: string;
  filder?: string;
};
