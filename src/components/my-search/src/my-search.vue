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
            <SearchFoot
              @resetClick="handleResetClick"
              @searchClick="handleSearchClick"
              :pageName="pageName"
            ></SearchFoot>
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

export default defineComponent({
  props: {
    searchConfig: {
      type: Object as PropType<IFormConfig>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    //?1.动态地绑定数据。
    // !这里可不能用computed，好好想想。

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formDataOrigin: any = {};

    for (const item of props.searchConfig.formItems) {
      if (item.field) {
        formDataOrigin[item.field] = '';
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData: any = ref({ ...formDataOrigin });
    // ?1.处理重置按钮,这里我们的formDataOrigin是一个空的对象（但是有键）。
    // 不过同时我们还是得重新发送一次请求，所以，还是得发送给user。
    const handleResetClick = () => {
      for (const key in formDataOrigin) {
        formData.value[`${key}`] = formDataOrigin[`${key}`];
      }
      emit('handleResetClick');
    };
    // ?2.处理搜索按钮，说白了就是重新请求一次数据，把formData给它发过去。
    // 由于需要让content重新发起请求，所以我们需要将它继续传给父亲。
    const handleSearchClick = () => {
      emit('handleSearchClick', { ...formData.value });
    };
    return { formData, handleResetClick, handleSearchClick };
  },
  components: { MyFormVue, SearchHeader, SearchFoot },
  emits: ['handleSearchClick', 'handleResetClick']
});
</script>

<style scoped></style>
