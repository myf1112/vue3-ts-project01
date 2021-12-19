<template>
  <div class="foot">
    <el-button type="primary" @click="searchClick" v-if="isQuery"
      >搜索</el-button
    >
    <el-button type="danger" @click="resetClick">重置</el-button>
  </div>
</template>

<script lang="ts">
import { usePermissions } from '@/hooks/usePermissions';
import { defineComponent } from 'vue';
export default defineComponent({
  emits: ['resetClick', 'searchClick'],
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const isQuery = usePermissions(props.pageName, 'query');

    const resetClick = () => {
      emit('resetClick');
    };
    const searchClick = () => {
      if (isQuery) {
        emit('searchClick');
      }
    };
    return { resetClick, searchClick, isQuery };
  }
});
</script>

<style scoped>
.foot {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
