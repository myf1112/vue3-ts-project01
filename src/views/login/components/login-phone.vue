<template>
  <div class="login-phone">
    <el-form
      label-width="80px"
      :rules="rules"
      :model="phoneMessage"
      ref="formRef"
    >
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="phoneMessage.phoneNumber" />
      </el-form-item>
      <el-form-item label="验证码" prop="identifyCode">
        <div class="identify">
          <el-input v-model="phoneMessage.identifyCode" />
          <el-button type="primary" style="margin-left: 10px">验证</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../config/phone-message-rules';
export default defineComponent({
  setup() {
    const phoneMessage = reactive({
      phoneNumber: '',
      identifyCode: ''
    });

    const formRef = ref<InstanceType<typeof ElForm>>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loginAction = (isRememberPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('手机号码的登录操作');
        }
      });
    };

    return {
      phoneMessage,
      rules,
      formRef,
      loginAction
    };
  }
});
</script>

<style scoped lang="less">
.identify {
  display: flex;
  justify-content: space-between;
}
</style>
