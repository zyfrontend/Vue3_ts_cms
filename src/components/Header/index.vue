<template>
  <div class="nav-header">
    <i
      class="fold-item"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
    <div class="header-content">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import Breadcrumb from './Breadcrumb.vue'
import UserInfo from './UserInfo.vue'
import { mapPathBreadcrumbs } from '@/utils/mapRoutes'
// 面包屑
const store = useStore()
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  return mapPathBreadcrumbs(userMenus, currentPath)
})
// 侧栏显示隐藏
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style lang="scss">
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
