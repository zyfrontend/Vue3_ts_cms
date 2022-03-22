<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <Menu :collapse="isCollapse"></Menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <Header @foldChange="foldChange"></Header>
        </el-header>
        <el-main class="page-content">
          <router-view class="page-view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Menu from '@/components/Menu/index.vue'
import Header from '@/components/Header/index.vue'
const isCollapse = ref(false)
const foldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="scss">
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
  height: 100%;
}
.page-content {
  height: calc(100vh - 48px);
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
