// vuex的根
import { createStore, Store } from 'vuex';
import { IRootState, IRootWithModule } from './type';
import loginModule from './login';
import { useStore as useVuexStore } from 'vuex';

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

export function useStore(): Store<IRootWithModule> {
  return useVuexStore();
}
export default store;
