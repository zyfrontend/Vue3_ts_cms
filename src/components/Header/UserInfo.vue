<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        {{ name }}
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
          <el-dropdown-item divided @click="handleExitClick">
            <i class="el-icon-circle-close"></i>
            退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

const store = useStore()
const router = useRouter()
const name = computed(() => store.state.login.userInfo.name)
const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/main')
}
</script>

<style lang="scss" scoped>
.user-info {
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .el-avatar {
    margin: 0 10px;
  }
}
</style>
