/* eslint-disable @typescript-eslint/no-explicit-any */
import { myRequest } from '..';
import { IDataType } from './type';

// 由于此时我们的url是由content组件根据pageName动态合成的。所以我们这里不用枚举属性。
// 改为传入url。

// enum mainAPI {
//   UserList = '/users/list'
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function allUserListRequest(url: string, queryInfo?: any) {
  return myRequest.post<IDataType<any>>({
    url: url,
    data: queryInfo,
    isShowLoading: false
  });
}
