import myStorage from '@/utils/my-storage';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'none',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  { path: '/main', name: 'main', component: () => import('../views/main/main.vue') }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = myStorage.getItem('token');
    if (!token) {
      return '/login';
    }
  }
});

export default router;
