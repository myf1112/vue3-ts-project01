/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteRecordRaw } from 'vue-router';
import { ICurrentName } from './types/current-name';
// !1.通过菜单注册路由，并且保存第一个路由。
let firstRoute: RouteRecordRaw;
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
          if (!firstRoute) {
            firstRoute = routeI;
          }
          userRoutes.push(routeI);
        }
      } else recurseGetRoute(menu.children);
    }
  };

  recurseGetRoute(userMenus);

  return userRoutes;
}

// !2.通过当前路径找出当前的index以及name。
export function pathToCurrentIndexAndBread(
  path: string,
  userMenus: any,
  name = false
) {
  let i = -1;

  for (const menu of userMenus) {
    i++;
    let j = -1;
    for (const submenu of menu.children) {
      j++;
      const breadConfig: ICurrentName[] = [];
      breadConfig.push(
        { path: submenu.url, name: menu.name },
        { path: submenu.url, name: submenu.name }
      );
      if (submenu.url === path) {
        if (!name) {
          return `${i}-${j}`;
        } else {
          return breadConfig;
        }
      }
    }
  }
}

export function userMenuToPermissions(userMenus: any[]) {
  const permissions: any[] = [];
  function _recursePermissions(userMenu: any[]) {
    for (const menu of userMenu) {
      if (menu.type === 1 || menu.type === 2) {
        // 千万别忘了这里需要判断是否还有children，不然肯定会报错的啊。
        _recursePermissions(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  }
  _recursePermissions(userMenus);
  return permissions;
}

// 额，不用想那么多，直接无脑导出就行了。
export { firstRoute };
