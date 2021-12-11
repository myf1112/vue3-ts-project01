import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { setupState } from './store';
import registerGlobal from '@/global';

import 'normalize.css';
import '@/assets/css/index.less';
import { menuToRoute } from './utils/menu-to-route';

const app = createApp(App);
app.use(registerGlobal);
setupState();
app.use(store);
app.use(router);
app.mount('#app');
