<template>
  <div class="foot">
    <el-button type="primary" @click="searchClick">搜索</el-button>
    <el-button type="danger" @click="resetClick">重置</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  emits: ['resetClick', 'searchClick'],
  setup(props, { emit }) {
    const resetClick = () => {
      emit('resetClick');
    };
    const searchClick = () => {
      emit('searchClick');
    };
    return { resetClick, searchClick };
  }
});
</script>

<style scoped>
.foot {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
