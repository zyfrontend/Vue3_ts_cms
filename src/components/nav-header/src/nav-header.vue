<template>
  <div class="nav-header">
    <i
      class="fold-item"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
    <div class="header-content">
      <div>
        <router-breadcumb></router-breadcumb>
      </div>
      <div>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 组件
import UserInfo from './user-info.vue'
import RouterBreadcumb from './router-breadcrumb.vue'
export default defineComponent({
  components: {
    UserInfo,
    RouterBreadcumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
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
