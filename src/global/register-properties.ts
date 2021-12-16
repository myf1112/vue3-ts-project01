import { formatUtcString } from '@/utils/date-format';
import { App } from 'vue';
// 给app注册全局的属性，方便进行调用
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatUtcString(value: string) {
      return formatUtcString(value);
    }
  };
}
