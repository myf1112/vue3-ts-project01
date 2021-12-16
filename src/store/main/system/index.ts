/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from 'vuex';
import { IRootState } from '@/store/type';
import { ISystemState } from './type';
import { allUserListRequest } from '@/service/main/system';
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      allUserList: [],
      allUserCount: 0
    };
  },

  mutations: {
    changeAllUserList(state, allUserList: any) {
      state.allUserList = allUserList;
    },
    changeAllUserCount(state, userCount: number) {
      state.allUserCount = userCount;
    }
  },
  actions: {
    async allUserListAction({ commit }, payload) {
      const allUserListOrigin = await allUserListRequest({ ...payload });
      const allUserList = allUserListOrigin.data.list;
      const allUserCount = allUserListOrigin.data.totalCount;

      commit('changeAllUserList', allUserList);
      commit('changeAllUserCount', allUserCount);
    }
  }
};

export default systemModule;
