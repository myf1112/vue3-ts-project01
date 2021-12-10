/* eslint-disable @typescript-eslint/no-explicit-any */
// 模块是不需要useStore的。
import router from '@/router';
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login';
import myStorage from '@/utils/my-storage';
import { Module } from 'vuex';
import { IRootState } from '../type';
import { IAccountLogin, ILoginState } from './type';
// 注意这里的类型指的是存储的类型，并不是返回数据的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any[]) {
      state.userInfo = userInfo;
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccountLogin) {
      // 发起真正的网络请求，我们最好封装到service中。

      const originResult = await accountLoginRequest({ ...payload });
      const realResult = originResult.data;
      const { id, token } = { ...realResult };

      // 存储到本地
      myStorage.setItem('token', token);
      // 修改vuex中的token
      commit('changeToken', token);

      // 依靠id请求用户信息和用户列表
      const originUserInfo = await requestUserInfoById(id);
      const realUserInfo = originUserInfo.data;
      myStorage.setItem('userInfo', realUserInfo);
      commit('changeUserInfo', realUserInfo);

      const originUserMenu = await requestUserMenusById(realUserInfo.role.id);
      const realUserMenu = originUserMenu.data;
      myStorage.setItem('userMenu', realUserMenu);
      commit('changeUserMenu', originUserMenu);

      // 跳转到首页
      router.push('/main');
    },
    loadLocalLoading({ commit }) {
      const token = myStorage.getItem('token');
      const userInfo = myStorage.getItem('userInfo');
      const userMenu = myStorage.getItem('userMenu');
      if (token) {
        commit('changeToken', token);
      }
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      if (userMenu) {
        commit('changeUserMenu', userMenu);
      }
    }
  }
};

export default loginModule;
