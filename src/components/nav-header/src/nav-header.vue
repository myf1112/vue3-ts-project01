<template>
  <div class="nav-header">
    <div class="change-fold">
      <el-icon @click="changeFolding" class="fold-menu">
        <tickets v-if="isCollapse"></tickets>
        <reading v-else></reading>
      </el-icon>
    </div>
    <div class="content">
      <div class="bread-crumb">
        <bread-crumb-vue
          :bread-crumb-config="breadCrumbConfig"
        ></bread-crumb-vue>
      </div>
      <drop-down-vue></drop-down-vue>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import dropDownVue from './drop-down.vue';
import BreadCrumbVue from '@/base-ui/bread-crumb';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { pathToCurrentIndexAndBread } from '@/utils/menu-to-route';
export default defineComponent({
  components: { dropDownVue, BreadCrumbVue },
  emits: ['changeFolding'],
  setup(props, { emit }) {
    // 关于折叠的处理
    const isCollapse = ref(false);
    const changeFolding = () => {
      isCollapse.value = !isCollapse.value;
      emit('changeFolding', isCollapse.value);
    };
    // 关于面包屑
    // 为此我们需要获得当前的路径以及菜单。
    // 这些我们都得放到compted中。这样我们的name才会随着其他东西的变化而变化。

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const breadCrumbConfig: any = computed(() => {
      const store = useStore();
      const userMenu = store.state.loginModule.userMenu;
      const route = useRoute();
      const currentPath = route.path;
      return pathToCurrentIndexAndBread(currentPath, userMenu, true);
    });
    return {
      isCollapse,
      changeFolding,
      breadCrumbConfig
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
