<template>
  <el-container class="login-container">
    <el-card class="login-card">
      <h1 class="login-title">CMS后台管理系统</h1>
      <LoginForm ref="loginRef"></LoginForm>
      <div class="login-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button class="login-button" type="primary" @click="handleLoginClick">
        登录
      </el-button>
    </el-card>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginForm from './loginForm.vue'

// 是否记住密码
const isKeepPassword = ref(true)

const loginRef = ref<InstanceType<typeof LoginForm>>()

// 按钮触发登录
const handleLoginClick = () => {
  loginRef.value?.loginAction(isKeepPassword.value)
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('http://image.zyfullstack.top/login-bg.svg');
  .login-card {
    width: 400px;
    .login-title {
      text-align: center;
    }
    .login-button {
      width: 100%;
    }
    .login-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
