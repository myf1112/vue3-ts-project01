<template>
  <div class="my-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              :rules="item.rules"
            >
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                v-model="formData[`${item.field}` ?? '']"
              ></el-input>
              <el-select
                v-else-if="item.type === 'select'"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="formData[`${item.field}` ?? '']"
              >
                <el-option
                  v-for="subItem in item.options"
                  :key="subItem.title"
                  :value="subItem.title"
                  >{{ subItem.title }}</el-option
                >
              </el-select>
              <el-date-picker
                v-if="item.type === 'datepicker'"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="formData[`${item.field}` ?? '']"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="foot"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { IFormItem } from '../types/type';
export default defineComponent({
  props: {
    // 注意，我们这个formData就是根据field动态生成的，所以在这里也用field动态绑定。
    myFormData: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup(props, { emit }) {
    // 这里小心传的时候获得是ref对象，得用value获得里面真正的值
    const formData = ref({ ...props.myFormData.value });
    watch(
      formData,
      (newValue) => {

        emit('update:myFormData', newValue);
      },
      { deep: true }
    );
    return { formData };
  }
});
</script>

<style scoped>
.my-form {
  padding-top: 22px;
}
</style>
