import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetBtnClick = () => {
    pageContentRef.value?.getpageData()
  }
  const handleQueryBtnClick = (queryInfo: any) => {
    pageContentRef.value?.getpageData(queryInfo)
  }
  return [pageContentRef, handleQueryBtnClick, handleResetBtnClick]
}
