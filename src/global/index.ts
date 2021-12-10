// 在这里进行所有关于App的操作
import { registerElementPlus } from './register-element-plus';
import { App } from 'vue';

export default function registerGlobal(app: App): void {
  registerElementPlus(app);
}
