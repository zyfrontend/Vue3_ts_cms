<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        Dropdown List
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <i class="el-icon-setting"></i>
            系统管理
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-user"></i>
            用户信息
          </el-dropdown-item>
          <el-dropdown-item divided>
            <i class="el-icon-circle-close"></i>
            退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.user-info {
}
</style>
