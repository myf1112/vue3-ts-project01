<template>
  <div class="user">
    <div class="search">
      <MyForm v-bind="userSearchConfig"></MyForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyForm from '@/base-ui/my-form';
import userSearchConfig from './config/search-config';

export default defineComponent({
  name: 'user',

  setup() {
    return {
      userSearchConfig
    };
  },
  components: { MyForm }
});
</script>

<style scoped></style>
