import pageContentVue from '@/components/page-content';
import { ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof pageContentVue>>();
  // ?出现报错是因为日期搜索的问题，不用在意。
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newSearchQuery = (formData: any) => {
    pageContentRef.value?.getPageListData(formData);
  };
  const newResetQuery = () => {
    pageContentRef.value?.getPageListData();
  };
  return [pageContentRef, newResetQuery, newSearchQuery];
}
