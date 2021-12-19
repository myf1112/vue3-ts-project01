// 在这里注册element-plus的组件
// 需要同时导入css。（方便管理，其实css在哪里导入都是可以的。）
import {
  ElAside,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElImage,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElPagination,
  ElRow,
  ElSelect,
  ElSubMenu,
  ElTable,
  ElTableColumn
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
  Reading,
  ArrowDown,
  Avatar
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
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Tickets,
  Reading,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ArrowDown,
  Avatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog
];

export function registerElementPlus(app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
