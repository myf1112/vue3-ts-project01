<template>
  <div class="my-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle" :rules="item.rules">
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
              ></el-input>
              <el-select
                v-else-if="item.type === 'select'"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
              >
                <el-option
                  v-for="subItem in item.options"
                  :key="subItem.title"
                  :value="$options.value"
                  >{{ subItem.title }}</el-option
                >
              </el-select>
              <el-date-picker
                v-if="item.type === 'datepicker'"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IFormItem } from '../type';
export default defineComponent({
  props: {
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
  setup() {
    return {};
  }
});
</script>

<style scoped>
.my-form {
  padding-top: 22px;
}
</style>
