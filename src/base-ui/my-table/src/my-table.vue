<template>
  <div class="my-table">
    <div class="header">
      <slot name="header" >
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
      <!-- 这里就有内置的size和currentPage函数 -->
      <el-pagination
        v-model:currentPage="tablePageInfo.requestCurrentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout=" sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, PropType, ref, watch } from 'vue';
import { IPropList, IUserListData } from '../types';
export default defineComponent({
  props: {
    // 分页器的数据
    pageCount: {
      type: Number,
      required: true
    },
    pageInfo: {
      type: Object,
      required: true
    },
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
  setup(props, { emit }) {
    // 在这里对页数以及请求数据作出改变
    const handleSizeChange = (val: any) => {
      tablePageInfo.value.requestSize = val;
    };
    const handleCurrentChange = (val: any) => {
      tablePageInfo.value.requestCurrentPage = val;
    };
    // 实现分页器数据(当前页数以及请求数据)的双向绑定。
    const tablePageInfo = ref({ ...props.pageInfo });
    // 这样它们两个是会动态改变的，但是如果对其中一个直接覆盖，将不会有影响。
    watch(
      tablePageInfo,
      (newValue) => {
        emit('update:pageInfo', newValue);
      },
      { deep: true }
    );

    // 页数
    // const pageCountNumber = ref(
    //   Math.ceil(props.pageCount / tablePageInfo.value.requestSize)
    // );
    // 处理一下子组件中的props属性，刷新后丢失的情况（都是异步的）。
    // const updatePageCountNumber = (value: number) => {
    //   pageCountNumber.value = value;
    //   console.log(pageCountNumber.value);
    // };

    return {
      handleSizeChange,
      handleCurrentChange,
      tablePageInfo

      // updatePageCountNumber
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
