<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <span> <userFilled :style="iconStyle" />账号登录 </span>
          </template>
          <login-account-vue ref="loginAccountRef"></login-account-vue>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span> <cellphone :style="iconStyle" />手机登录 </span>
          </template>
          <login-phone-vue ref="loginPhoneRef"></login-phone-vue>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="account-control">
      <el-checkbox v-model="isRememberPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import myStorage from '@/utils/my-storage';
import { defineComponent, ref } from 'vue';
import loginAccountVue from './login-account.vue';
import loginPhoneVue from './login-phone.vue';

export default defineComponent({
  components: { loginAccountVue, loginPhoneVue },
  setup() {
    const iconStyle = {
      width: '2em',
      height: ' 2em',
      marginRight: '4px',
      verticalAlign: 'middle'
    };
    // 定义一个变量存储当前选择的标签页。我们得给他一个默认值。
    const currentTab = ref('account');

    // 处理登录的请求，父组件调用子组件的方法
    const loginAccountRef = ref<InstanceType<typeof loginAccountVue>>();
    const loginPhoneRef = ref<InstanceType<typeof loginPhoneVue>>();
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        // 注意我们可以将是否保存密码的变量传过去。
        loginAccountRef.value?.loginAction(isRememberPassword.value);
      } else {
        loginPhoneRef.value?.loginAction(isRememberPassword.value);
      }
    };
    // 处理记住记住密码（小坑：当GetItem失败时，返回的是undefined）
    const isRememberPassword = ref();
    if (myStorage.getItem('password')) {
      isRememberPassword.value = true;
    } else {
      isRememberPassword.value = false;
    }

    return {
      iconStyle,
      handleLoginClick,
      loginAccountRef,
      loginPhoneRef,
      currentTab,
      isRememberPassword
    };
  }
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 360px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
