// 在这里注册element-plus的组件
// 需要同时导入css。（方便管理，其实css在哪里导入都是可以的。）
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElTable
} from 'element-plus/lib/components';
import { App } from 'vue';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/dist/index.css';
import { ElIcon, ElTabPane, ElTabs } from 'element-plus';
import {
  UserFilled,
  Cellphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Tickets,
  Reading
} from '@element-plus/icons';

const components = [
  ElButton,
  ElTable,
  ElTabPane,
  ElTabs,
  UserFilled,
  Cellphone,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElCheckbox,
  ElLink,
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElIcon,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Tickets,
  Reading
];

export function registerElementPlus(app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
