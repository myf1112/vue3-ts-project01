<template>
  <div class="my-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>
    <div class="table-content">
      <el-table :data="pageListData" border style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          v-if="isShowSelection"
        />
        <el-table-column
          type="index"
          align="center"
          v-if="isShowIndex"
          label="序号"
          width="80"
        />
        <template v-for="propItem in propList" :key="propItem.prop">
          <!-- prop表示需要展示我们传过去的数据的哪几列，比如不传id，就不会展示id这一列 -->
          <!-- 灵活使用v-bind来帮顶属性 -->
          <el-table-column
            v-bind="propItem"
            align="center"
            show-overflow-tooltip
          >
            <!-- 这是使用el-table-column给我们封装的作用域插槽 -->
            <!-- scope.row就表示了这一整行的数据 -->
            <!-- <template #default="scope">{{scope.row[propItem.prop]}}</template> -->
            <!--为了让父组件能够决定，也就是真正使用的组件你，我们还需要再增加一个插槽-->
            <!-- 为此，可以给插槽增加一个插槽名 -->
            <template #default="scope"
              ><slot :name="propItem.slotName" :row="scope.row">
                {{ scope.row[propItem.prop] }}
              </slot></template
            >
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:currentPage="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, PropType, ref } from 'vue';
import { IPropList, IUserListData } from '../types';
export default defineComponent({
  props: {
    // 要展示的数据（注意这个泛型应该让使用组件者传入，所以这样会有点缺乏泛用性）
    // 但是也可以每次使用的时候把类型补上。
    pageListData: {
      type: Array as PropType<IUserListData[]>,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    // 每一列数据的情况，也就是标签，需要展示的数据，宽度等等
    propList: {
      type: Array as PropType<IPropList[]>,
      default: () => []
    },
    isShowSelection: {
      type: Boolean,
      default: false
    },
    isShowIndex: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleSelectionChange = (value: any) => {
    //   return;
    // };
    // return { handleSelectionChange };
    const handleSizeChange = (val: any) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val: any) => {
      console.log(`current page: ${val}`);
    };

    return {
      currentPage1: ref(5),
      currentPage2: ref(5),
      currentPage3: ref(5),
      currentPage4: ref(4),
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
