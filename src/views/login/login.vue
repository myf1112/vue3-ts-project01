<template>
  <div class="login">
    <login-panel-vue></login-panel-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import loginPanelVue from './components/login-panel.vue';
export default defineComponent({
  components: {
    loginPanelVue
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
