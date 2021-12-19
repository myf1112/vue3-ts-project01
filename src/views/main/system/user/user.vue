<template>
  <div class="users">
    <div class="search">
      <mySearchVue
        :search-config="userSearchConfig"
        @handle-search-click="newSearchQuery"
        @handle-reset-click="newResetQuery"
        :page-name="'users'"
      ></mySearchVue>
    </div>
    <div class="table">
      <pageContentVue
        :pageContentConfig="pageContentConfig"
        :page-name="'users'"
        ref="pageContentRef"
        @create-click="handleCreateClick"
        @edit-click="handleEditClick"
      ></pageContentVue>
    </div>
    <div class="page-modal">
      <pageModalVue
        :title="'编辑用户'"
        ref="pageModalVueRef"
        :modal-config="modalConfig"
        v-model:formDataOrigin="formDataOrigin"
      ></pageModalVue>
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
import pageModalVue from '@/components/page-modal';
import { usePageModal } from '@/hooks/usePageModal';
import {modalConfig }from './config/modal-config';

export default defineComponent({
  name: 'user',
  components: { pageContentVue, mySearchVue, pageModalVue },
  setup() {
    const [pageContentRef, newResetQuery, newSearchQuery] = usePageSearch();
    const [pageModalVueRef, handleEditClick, handleCreateClick,formDataOrigin] =
      usePageModal();

    return {
      userSearchConfig,
      pageContentConfig,
      newSearchQuery,
      newResetQuery,
      pageContentRef,
      pageModalVueRef,
      handleEditClick,
      handleCreateClick,
      modalConfig,
      formDataOrigin
    };
  }
});
</script>

<style scoped></style>
