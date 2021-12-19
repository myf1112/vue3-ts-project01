<template>
  <div class="users">
    <div class="search">
      <mySearchVue
        :search-config="userSearchConfig"
        @handle-search-click="newSearchQuery"
        @handle-reset-click="newResetQuery"
        :page-name="'goods'"
      ></mySearchVue>
    </div>
    <div class="table">
      <pageContentVue
        :pageContentConfig="pageContentConfig"
        :page-name="'goods'"
        ref="pageContentRef"
      >
        <template #img="scope">
          <el-image
            style="width: 100%; height: 100%"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            :initial-index="1"
          >
          </el-image
        ></template>
      </pageContentVue>
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
  name: 'goods',
  components: { pageContentVue, mySearchVue },
  setup() {
    const [pageContentRef, newResetQuery, newSearchQuery] = usePageSearch();
    return {
      userSearchConfig,
      pageContentConfig,
      newSearchQuery,
      newResetQuery,
      pageContentRef
    };
  }
});
</script>

<style scoped></style>
