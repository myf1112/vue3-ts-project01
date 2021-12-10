import { ILoginState } from './login/type';

export interface IRootState {
  name: string;
}

export interface IRootWithModule extends IRootState {
  loginModule: ILoginState;
}
