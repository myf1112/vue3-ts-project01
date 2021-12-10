<template>
  <div class="nav-header">
    <el-icon @click="changeFolding" class="fold-menu">
      <tickets v-if="isCollapse"></tickets>
      <reading v-else></reading>
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  emits: ['changeFolding'],
  setup(props, { emit }) {
    const isCollapse = ref(false);
    const changeFolding = () => {
      isCollapse.value = !isCollapse.value;
      emit('changeFolding', isCollapse.value);
    };
    return {
      isCollapse,
      changeFolding
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
