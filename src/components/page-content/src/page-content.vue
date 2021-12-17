<template>
  <div class="page-content">
    <myTableVue v-bind="pageContentConfig" :page-list-data="pageListData">
      <template #header-handler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <template #state="myTable">
        <!-- 获取子组件中传过来的row -->
        <el-button v-if="myTable.row.enable" type="primary" size="mini" plain
          >启用</el-button
        >
        <el-button v-else type="danger" size="mini" plain>禁用</el-button>
      </template>
      <template #createAt="myTable">{{
        $filters.formatUtcString(myTable.row.createAt)
      }}</template>
      <template #updateAt="myTable">{{
        $filters.formatUtcString(myTable.row.updateAt)
      }}</template>
      <template #handler>
        <el-button type="text" size="medium">编辑</el-button>
        <el-button type="text" size="medium">删除</el-button>
      </template>
      <template
        v-for="item in otherSlotProps"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </myTableVue>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import myTableVue from '@/base-ui/my-table/src/my-table.vue';
import { useStore } from '@/store';
export default defineComponent({
  components: { myTableVue },
  props: {
    pageContentConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 注意一下逻辑，之=只要配置中有slotName的，在我们的myTable就会有相应的插槽
    // 有一部分通用的，在我们的content中也会有相应的映射
    // 但对于一部分不通用的，显然不能直接写到content中，我们选择在content中动态生成
    // 然后交给父组件决定。
    //!但同时，我们要让这里动态的插槽于table中的对应上。

    // 设置一些不通用的插槽，避免直接设置在content中
    const otherSlotProps = props.pageContentConfig.propList.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => {
        if (
          !item.slotName ||
          item.slotName === 'createAt' ||
          item.slotName === 'updateAt' ||
          item.slotName === 'handler' ||
          item.slotName === 'state'
        ) {
          return false;
        } else {
          return true;
        }
      }
    );

    let pageListData;
    // !注意这个store得写在外面，函数里新建的相当于是一个新的。
    const store = useStore();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getPageListData(formData?: any) {
      // !发起网络请求我们应该写在一个函数中，因为需要多次调用。
      // 在pageContent中根据传过来的pageName来动态地获取数据，避免重复代码。

      //!注意在这里调用方法，我们应该是调用同一个Action方法。
      // 但是我们可以将pageName传过去，让action发起不同的请求。
      store.dispatch('systemModule/allPageListAction', {
        pageName: props.pageName,
        // 注意这里的queryInfo也应该共享，每次使用的queryInfo应该是同一个，不应该写死。
        // !所以我们将queryInfo也放到vuex中吧。
        queryInfo: {
          offset: 0,
          size: 10,
          ...(formData ?? {})
        }
      });
      pageListData = computed(() => {
        return store.getters['systemModule/getPageListData'](props.pageName);
      });
    }
    getPageListData();
    return { pageListData, getPageListData, otherSlotProps };
  }
});
</script>

<style scoped></style>
