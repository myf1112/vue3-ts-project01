<template>
  <div class="page-content">
    <myTableVue
      v-bind="pageContentConfig"
      :page-list-data="pageListData"
      :page-count="pageSize"
      v-model:pageInfo="pageInfo"
      ref="myTableVueRef"
    >
      <template #header-handler>
        <el-button type="primary" v-if="isCreate" @click="createClick"
          >新建用户</el-button
        >
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
      <template #handler="scoped">
        <el-button
          type="text"
          size="medium"
          v-if="isEdit"
          @click="editClick(scoped.row)"
          >编辑</el-button
        >
        <el-button
          type="text"
          size="medium"
          v-if="isDelete"
          @click="handleDeleteClick(scoped.row.id)"
          >删除</el-button
        >
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
import { computed, defineComponent, ref, watch } from 'vue';
import myTableVue from '@/base-ui/my-table/src/my-table.vue';
import { useStore } from '@/store';
import { usePermissions } from '@/hooks/usePermissions';
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
  emits: ['createClick', 'editClick'],
  setup(props, { emit }) {
    // 是否具有权限
    const isEdit = usePermissions(props.pageName, 'update');
    const isDelete = usePermissions(props.pageName, 'delete');
    const isCreate = usePermissions(props.pageName, 'create');

    // 处理数据丢失的问题。用ref调用方法。无效。

    // 分页器的总页数,这个数据是不变的，不需要双向绑定。
    // 由于对于不同的页面，我们返回的数据不一样，所以也要使用getters。
    const pageSize = computed(() => {
      return store.getters['systemModule/getPageCountData'](props.pageName);
    });
    // 当前页数和请求的尺寸，由于这个是会改变的，所以我们得动态地去写
    const pageInfo = ref({
      requestSize: 10,
      requestCurrentPage: 1
    });
    // 显然，当我们的pageInfo发生了改变，我们就要重新请求数据
    watch(
      pageInfo,
      () => {
        getPageListData();
      },
      { deep: true }
    );

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
    // 这个和我们导入不一样。
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
        // ?貌似也可以不方进去啊，显然我们请求的页数和size都是根据信息来的
        // table通过修改这些数据，让我们动态地请求
        queryInfo: {
          // 页数1的话，我们偏移是0。(这个的意思是偏移的数据量)
          offset:
            (pageInfo.value.requestCurrentPage - 1) *
            pageInfo.value.requestSize,
          size: pageInfo.value.requestSize,
          ...(formData ?? {})
        }
      });
      pageListData = computed(() => {
        return store.getters['systemModule/getPageListData'](props.pageName);
      });
    }

    // 实现删除操作
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDeleteClick = (id: any) => {
      store.dispatch('systemModule/deletePageListAction', {
        id: id,
        pageName: props.pageName
      });
      getPageListData();
    };

    getPageListData();

    // 实现编辑以及新建操作。
    const createClick = () => {
      emit('createClick');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editClick = (id: any) => {
      emit('editClick', id);
    };
    return {
      pageListData,
      getPageListData,
      otherSlotProps,
      pageSize,
      pageInfo,
      myTableVue,
      isEdit,
      isDelete,
      isCreate,
      handleDeleteClick,
      createClick,
      editClick
    };
  }
});
</script>

<style scoped></style>
