/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoginState {
  token: string;
  userInfo: any;
  userMenu: any;
  permissions: string[];
}

export interface IAccountLogin {
  name: string;
  password: number;
}
