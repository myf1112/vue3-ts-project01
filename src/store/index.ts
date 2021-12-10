// vuex的根
import { createStore } from 'vuex';
import { IRootState } from './type';
import loginModule from './login';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'myf'
    };
  },
  mutations: {},
  actions: {},
  modules: { loginModule }
});

export function setupState() {
  store.dispatch('loginModule/loadLocalLoading');
}

export default store;
