import { ILoginState } from './login/type';
import { ISystemState } from './main/system/type';

export interface IRootState {
  name: string;
}
// 在这里导入接口，这样我们后续的state就可以将它点出来。
export interface IRootWithModule extends IRootState {
  loginModule: ILoginState;
  systemModule: ISystemState;
}
