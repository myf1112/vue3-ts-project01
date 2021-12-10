<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import myStorage from '@/utils/my-storage';
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { rules } from '../config/account-rules';
export default defineComponent({
  setup() {
    const account = reactive({
      name: myStorage.getItem('name') ?? '',
      password: myStorage.getItem('password') ?? ''
    });
    // 判断是否验证成功并且发起真正的请求。
    const store = useStore();
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isRememberPassword: boolean) => {
      formRef.value?.validate((valid) => {
        // 是否记住密码
        if (valid) {
          myStorage.setItem('name', account.name);
          if (isRememberPassword) {
            myStorage.setItem('password', account.password);
          } else {
            myStorage.removeItem('password');
          }
          // 发起请求,传参数还是浅拷贝。
          store.dispatch('loginModule/accountLoginAction', { ...account });
        }
      });
    };
    return { account, rules, formRef, loginAction };
  }
});
</script>

<style scoped></style>
