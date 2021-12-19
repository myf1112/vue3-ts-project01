/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from 'vuex';
import { IRootState } from '@/store/type';
import { ISystemState } from './type';
import { allUserListRequest, deletePageData } from '@/service/main/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  //!注意，一旦使用拼接的方式，我们的属性/路径/方法之间必须得对上
  // *所以我这里直接使用的goods而没有使用product。
  state() {
    return {
      allUsersList: [],
      allUsersCount: 0,
      allDepartmentList: [],
      allDepartmentCount: 0,
      allRoleList: [],
      allRoleCount: 0,
      allMenuList: [],
      allMenuCount: 0,
      allGoodsList: [],
      allGoodsCount: 0,
      allCategoryList: [],
      allCategoryCount: 0
    };
  },
  // 使用getter让content可以根据pageName来动态地获取数据。
  getters: {
    getPageListData(state) {
      return (pageName: string) => {
        const pageNameUp =
          pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
        return (state as any)[`all${pageNameUp}List`];
      };
    },
    getPageCountData(state) {
      return (pageName: string) => {
        const pageNameUp =
          pageName.slice(0, 1).toUpperCase() + pageName.slice(1);

        return (state as any)[`all${pageNameUp}Count`];
      };
    }
  },

  mutations: {
    changeAllUserList(state, allUserList: any) {
      state.allUsersList = allUserList;
    },
    changeAllUserCount(state, allUserCount: number) {
      state.allUsersCount = allUserCount;
    },
    changeAllDepartmentList(state, allDepartmentList: any) {
      state.allDepartmentList = allDepartmentList;
    },
    changeAllDepartmentCount(state, allDepartmentCount: number) {
      state.allDepartmentCount = allDepartmentCount;
    },
    changeAllRoleList(state, allRoleList: any) {
      state.allRoleList = allRoleList;
    },
    changeAllRoleCount(state, allRoleCount: number) {
      state.allRoleCount = allRoleCount;
    },
    changeAllMenuList(state, allMenuList: any) {
      state.allMenuList = allMenuList;
    },
    changeAllMenuCount(state, allMenuCount: number) {
      state.allMenuCount = allMenuCount;
    },
    changeAllGoodsList(state, allGoodsList: any) {
      state.allGoodsList = allGoodsList;
    },
    changeAllGoodsCount(state, allGoodsCount: number) {
      state.allGoodsCount = allGoodsCount;
    },
    changeAllCategoryList(state, allCategoryList: any) {
      state.allCategoryList = allCategoryList;
    },
    changeAllCategoryCount(state, allCategoryCount: number) {
      state.allCategoryCount = allCategoryCount;
    }
  },
  actions: {
    async allPageListAction({ commit }, payload) {
      // 动态地实现请求网页数据
      const pageName = payload.pageName;
      const queryInfo = payload.queryInfo;
      const pageUrl = `/${pageName}/list`;

      const allPageListOrigin = await allUserListRequest(pageUrl, queryInfo);
      const allPageList = allPageListOrigin.data.list;
      const allPageCount = allPageListOrigin.data.totalCount;
      // 动态地提交修改数据。（其实都是可以使用switch的，也可以使用拼接）
      switch (pageName) {
        case 'users':
          commit('changeAllUserList', allPageList);
          commit('changeAllUserCount', allPageCount);
          break;
        case 'department':
          commit('changeAllDepartmentList', allPageList);
          commit('changeAllDepartmentCount', allPageCount);
          break;
        case 'role':
          commit('changeAllRoleList', allPageList);
          commit('changeAllDepartmentCount', allPageCount);
          break;
        case 'menu':
          commit('changeAllMenuList', allPageList);
          commit('changeAllMenuCount', allPageCount);
          break;
        case 'goods':
          commit('changeAllGoodsList', allPageList);
          commit('changeAllGoodsCount', allPageCount);
          break;
        case 'category':
          commit('changeAllCategoryList', allPageList);
          commit('changeAllCategoryCount', allPageCount);
          break;
      }
    },
    async deletePageListAction({ dispatch }, payload) {
      const pageName = payload.pageName;
      const id = payload.id;

      const pageUrl = `/${pageName}/${id}`;

      deletePageData(pageUrl);
    }
  }
};

export default systemModule;
