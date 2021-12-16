<template>
  <div class="page-content">
    <myTableVue v-bind="pageContentConfig" :page-list-data="pageListData">
      <template #state="myTable">
        <!-- 获取子组件中传过来的row -->
        <el-button v-if="myTable.row.enable" type="primary" size="mini"
          >启用</el-button
        >
        <el-button v-else type="danger" size="mini">禁用</el-button>
      </template>
      <template #createAt="myTable">{{
        $filters.formatUtcString(myTable.row.createAt)
      }}</template>
      <template #updateAt="myTable">{{
        $filters.formatUtcString(myTable.row.updateAt)
      }}</template>
      <template #handler>
        <el-button type="primary" size="medium">新建用户</el-button>
      </template>
    </myTableVue>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import myTableVue from '@/base-ui/my-table/src/my-table.vue';
import { IUserListData } from '@/base-ui/my-table/types';
export default defineComponent({
  components: { myTableVue },
  props: {
    pageContentConfig: {
      type: Object,
      required: true
    },
    pageListData: {
      type: Array as PropType<IUserListData[]>,
      default: () => []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
