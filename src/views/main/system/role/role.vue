<template>
  <div class="users">
    <div class="search">
      <mySearchVue
        :search-config="userSearchConfig"
        @handle-search-click="newSearchQuery"
        @handle-reset-click="newResetQuery"
      ></mySearchVue>
    </div>
    <div class="table">
      <pageContentVue
        :pageContentConfig="pageContentConfig"
        :page-name="'role'"
        ref="pageContentRef"
      ></pageContentVue>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import userSearchConfig from './config/search-config';
import pageContentVue from '@/components/page-content';
import { pageContentConfig } from './config/page-content-config';
import mySearchVue from '@/components/my-search';
import { usePageSearch } from '@/hooks/usePageSearch';
export default defineComponent({
  name: 'role',
  components: { pageContentVue, mySearchVue },
  setup() {
    const [pageContentRef, newSearchQuery, newResetQuery] = usePageSearch();
    return {
      userSearchConfig,
      pageContentConfig,
      pageContentRef,
      newSearchQuery,
      newResetQuery
    };
  }
});
</script>

<style scoped></style>
