<!-- 这里我们也需要通过路径获取，当前路劲的名字以及上一级路径的名字 -->
<!-- 但是别在这里写，用配置，别的东西还得用我们这个呢 -->
<!-- 最好是name和path的数组传进来，然后我们遍历 -->
<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrumbConfig" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { IBreadCrumbConfig } from '../types';
export default defineComponent({
  props: {
    breadCrumbConfig: {
      type: Array as PropType<IBreadCrumbConfig[]>,
      required: true
    }
  },
  setup() {
    return;
  }
});
</script>

<style scoped></style>
