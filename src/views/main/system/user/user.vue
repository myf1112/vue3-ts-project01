<template>
  <div class="user">
    <div class="search">
      <MySearch :search-config="userSearchConfig"></MySearch>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import userSearchConfig from './config/search-config';
import MySearch from '@/components/my-search';

export default defineComponent({
  name: 'user',

  setup() {
    return {
      userSearchConfig
    };
  },
  components: { MySearch }
});
</script>

<style scoped></style>
