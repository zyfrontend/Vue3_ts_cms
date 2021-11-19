<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="foldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <router-view class="page-view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 业务组件
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    // 是否折叠 menu
    const isCollapse = ref(false)
    // 获取组件传的值
    const foldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      foldChange,
      isCollapse
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
}

.main-content,
.page {
  height: 100%;
}
.page-view {
  background: white;
}
.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
