<!-- 由于搜索框也有很多相同的逻辑，于是我们将它也进行一个封装 -->
<!-- 包括绑定的数据，其实也可以放在这里进行 -->
<template>
  <div class="my-search">
    <div class="search-content">
      <MyFormVue v-bind="searchConfig" v-model:myFormData="formData">
        <template #header>
          <div class="search-header">
            <SearchHeader></SearchHeader>
          </div>
        </template>
        <template #foot>
          <div class="search-foot">
            <SearchFoot></SearchFoot>
          </div> </template
      ></MyFormVue>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import MyFormVue from '@/base-ui/my-form';
import { IFormConfig } from '../types/type';
import SearchHeader from './search-header.vue';
import SearchFoot from './search-foot.vue';
import userSearchConfig from '@/views/main/system/user/config/search-config';
export default defineComponent({
  props: {
    searchConfig: {
      type: Object as PropType<IFormConfig>,
      required: true
    }
  },
  setup() {
    // 动态地绑定数据。
    // !这里可不能用computed，好好想想。
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formDataOrigin: any = {};
    for (const item of userSearchConfig.formItems) {
      if (item.field) {
        formDataOrigin[item.field] = '';
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData: any = ref({ ...formDataOrigin });

    return { formData };
  },
  components: { MyFormVue, SearchHeader, SearchFoot }
});
</script>

<style scoped></style>
