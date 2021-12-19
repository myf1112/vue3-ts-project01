<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus/lib/components';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup() {
    return { locale: zhCn };
  }
});
</script>

<style scoped lang="less">
.app {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
