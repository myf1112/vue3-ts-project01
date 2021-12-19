<template>
  <div>
    <el-button type="text" @click="centerDialogVisible = true"
      >Click to open Dialog</el-button
    >

    <el-dialog
      v-model="centerDialogVisible"
      :title="title"
      width="30%"
      destroy-on-close
      center
    >
      <div class="content">
        <myFormVue
          v-model:my-form-data="formData"
          v-bind="modalConfig"
        ></myFormVue>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, ref, watch } from 'vue';
import myFormVue from '@/base-ui/my-form';
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    modalConfig: {
      type: Object,
      required: true
    },
    formDataOrigin: {
      type: Object,
      required: true
    }
  },
  components: { myFormVue },
  setup(props) {
    const centerDialogVisible = ref(false);

    const formData = ref<any>({});

    watch(
      () => props.formDataOrigin,
      (newValue: any) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
        console.log(formData.value);

      },
      { deep: true }
    );

    return {
      centerDialogVisible,
      formData
    };
  }
});
</script>

<style scoped></style>
