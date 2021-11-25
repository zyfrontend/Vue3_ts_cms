<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryBtnClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// 导入配置
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
// 业务组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
// hooks
// import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const pageContentRef = ref<InstanceType<typeof PageContent>>()

    const handleResetBtnClick = () => {
      pageContentRef.value?.getpageData()
    }
    const handleQueryBtnClick = (queryInfo: any) => {
      pageContentRef.value?.getpageData(queryInfo)
    }
    return {
      searchFormConfig,
      contentTableConfig,
      handleResetBtnClick,
      handleQueryBtnClick,
      pageContentRef
    }
  }
})
</script>

<style scoped lang="less">
.user {
}
</style>
