import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { setupState } from './store';
import registerGlobal from '@/global';
import 'default-passive-events';

import 'normalize.css';
import '@/assets/css/index.less';

// import ElementPlus from 'element-plus';
// import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App);
app.use(registerGlobal);
setupState();
app.use(store);
app.use(router);
// app.use(ElementPlus, {
//   locale: zhCn
// });
app.mount('#app');
