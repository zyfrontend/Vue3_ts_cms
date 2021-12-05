<template>
  <div class="nav-header">
    <i
      class="fold-item"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
    <div class="header-content">
      <div>
        <zy-breadcrumb :breadcrumbs="breadcrumbs"></zy-breadcrumb>
      </div>
      <div>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { mapPathBreadcrumbs } from '@/utils/map-routes'
// 组件
import UserInfo from './user-info.vue'
import ZyBreadcrumb from '@/UI/breadcrumb'
export default defineComponent({
  components: {
    UserInfo,
    ZyBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 面包屑数据
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path

      return mapPathBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .header-content {
    width: 100%;
    flex: 1;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
  // 图标
  .fold-item {
    font-size: 25px;
  }
}
</style>
