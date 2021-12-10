/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// 在请求的地方我们才需要设置返回数据的类型。
import { IAccountLogin } from '@/store/login/type';
import { myRequest } from '..';
import { IDataType, ILoginResult } from './type';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1，这里需要传入用户的id。
  UserMenus = '/role/' // 用法: role/1/menu
}
// 请求登录。
export function accountLoginRequest(account: IAccountLogin) {
  // 先设置为any，看到返回的类型后再修改
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}
// 请求用户的信息
export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType<any>>({
    url: `${LoginAPI.LoginUserInfo}${id}`,
    isShowLoading: false
  });
}

export function requestUserMenusById(id: number) {
  return myRequest.get<IDataType<any>>({
    url: `${LoginAPI.UserMenus}${id}/menu`,
    isShowLoading: false
  });
}
