<template>
  <div class="user">
    <div class="page-search">
      <mySearchVue :search-config="userSearchConfig"></mySearchVue>
    </div>
    <div class="table">
      <pageContentVue
        :pageContentConfig="pageContentConfig"
        :pageListData="allUserListData"
      ></pageContentVue>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import userSearchConfig from './config/search-config';
import { useStore } from '@/store';
import pageContentVue from '@/components/page-content';
import { pageContentConfig } from './config/page-content-config';
import mySearchVue from '@/components/my-search';
export default defineComponent({
  name: 'user',
  components: { pageContentVue,mySearchVue },
  setup() {
    // 将allUserListData传过去
    const store = useStore();
    store.dispatch('systemModule/allUserListAction', {
      offset: 0,
      size: 10
    });
    const allUserListData = computed(() => {
      return store.state.systemModule.allUserList;
    });

    return {
      userSearchConfig,
      allUserListData,
      pageContentConfig
    };
  }
});
</script>

<style scoped></style>
