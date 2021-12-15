/* eslint-disable @typescript-eslint/no-explicit-any */
// 注意一下类型的写法
type IFormType = 'input' | 'password' | 'select' | 'datepicker';
// 每个选项的配置，我们需要给props传过去。
export interface IFormItem {
  field?: string;
  type: IFormType;
  label: string;
  placeholder?: string;
  rules?: any[];

  options?: any[];

  otherOptions?: any;
}

// 整个配置的类型，我们需要给要用的配置文件传过去

// 那么为什么我们要单独将这些分开呢？
// 因为这些剩下的属性基本是他们共享（一样的）的，所以我们就直接通过这个配置将他们写死了。
// 例如label的宽度（共享），每行所占的比例和样式（也应该是一样的）。
export interface IFormConfig {
  formItems: IFormItem[];
  labelWidth?: string;
  itemStyle?: any;
  colLayout?: any;
}
