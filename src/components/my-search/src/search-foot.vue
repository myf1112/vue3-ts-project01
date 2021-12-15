<template>
  <div class="foot">
    <el-button type="primary">搜索</el-button>
    <el-button type="danger">重置</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped>
.foot {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
