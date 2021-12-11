/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteRecordRaw } from 'vue-router';

export function menuToRoute(userMenus: any[]): RouteRecordRaw[] {
  // 先拿到所有的路由
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context('../router/main', true, /\.ts/);
  const routePaths = routeFiles.keys();
  routePaths.forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });
  // 然后我们应该对菜单进行处理，根据菜单来拿路由！！
  const userRoutes: RouteRecordRaw[] = [];

  const recurseGetRoute = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const routeI = allRoutes.find((route) => route.path === menu.url);
        if (routeI) {
          userRoutes.push(routeI);
        }
      } else recurseGetRoute(menu.children);
    }
  };

  recurseGetRoute(userMenus);

  return userRoutes;
}

export function pathToCurrentIndex(path: string, userMenus: any) {
  let i = -1;

  console.log(path, userMenus);

  for (const menu of userMenus) {
    i++;
    let j = -1;
    for (const submenu of menu.children) {
      j++;
      if (submenu.url === path) {
        console.log(`${i}-${j}`);

        return `${i}-${j}`;
      }
    }
  }
}
