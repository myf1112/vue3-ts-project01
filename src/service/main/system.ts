/* eslint-disable @typescript-eslint/no-explicit-any */
import { myRequest } from '..';
import { IDataType } from './type';

enum mainAPI {
  UserList = '/users/list'
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function allUserListRequest(queryInfo?: any) {
  return myRequest.post<IDataType<any>>({
    url: mainAPI.UserList,
    data: queryInfo,
    isShowLoading: false
  });
}
