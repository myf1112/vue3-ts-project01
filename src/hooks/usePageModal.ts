/* eslint-disable @typescript-eslint/no-explicit-any */
// 注意对于每个组件的处理方式都写在hook中。
// 不用函数的返回写法也是可以的但是不灵活。并且此ref！==彼ref
import pageModalVue from '@/components/page-modal';
import { ref } from 'vue';

export function usePageModal(): any {
  const formDataOrigin: any = ref({});

  const pageModalVueRef = ref<InstanceType<typeof pageModalVue>>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditClick = (item: any) => {
    if (pageModalVueRef.value) {
      formDataOrigin.value = {...item};
      pageModalVueRef.value.centerDialogVisible = true;
    }
  };

  const handleCreateClick = (): void => {
    if (pageModalVueRef.value) {
      pageModalVueRef.value.centerDialogVisible = true;
    }
  };

  return [pageModalVueRef, handleEditClick, handleCreateClick, formDataOrigin];
}
