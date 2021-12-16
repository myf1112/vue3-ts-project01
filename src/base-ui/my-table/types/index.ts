export interface IUserListData {
  cellphone?: number;
  createAt?: string;
  departmentId?: number;
  enable?: number;
  id?: number;
  name?: string;
  realname?: string;
  roleId?: number;
  updateAt?: string;
}

export interface IPropList {
  prop: string;
  label: string;
  minWidth: string;
  slotName?:string
}
