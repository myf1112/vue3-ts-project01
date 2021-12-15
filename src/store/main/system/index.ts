import { Module } from 'vuex';
import { IRootState } from '@/store/type';
import { ISystemState } from './type';
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    };
  },

  mutations: {},
  actions: {}
};

export default systemModule;
