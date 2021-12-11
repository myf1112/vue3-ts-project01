<template>
  <div class="nav-header">
    <div class="change-fold">
      <el-icon @click="changeFolding" class="fold-menu">
        <tickets v-if="isCollapse"></tickets>
        <reading v-else></reading>
      </el-icon>
    </div>
    <div class="content">
      <div>面包屑</div>
      <drop-down-vue></drop-down-vue>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import dropDownVue from './drop-down.vue';
export default defineComponent({
  components: { dropDownVue },
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
  display: flex;
  width: 100%;
  justify-content: space-between;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
