/* eslint-disable @typescript-eslint/no-explicit-any */
// T表示获得的真正数据的类型，但是种类很多，并且不好写，所以传一个泛型
// 并且给一个默认值any。
export interface IDataType<T = any> {
  code: number;
  data: T;
}

