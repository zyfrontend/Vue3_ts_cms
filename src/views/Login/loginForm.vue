<template>
  <el-form status-icon :rules="rules" :model="account" ref="formRef">
    <el-form-item prop="name" class="form-item">
      <el-input
        :prefix-icon="User"
        placeholder="name"
        v-model="account.name"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input
        type="password"
        :prefix-icon="View"
        placeholder="password"
        :show-password="true"
        v-model="account.password"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { User, View } from '@element-plus/icons'
import localCache from '@/utils/cache'
// 登录信息
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 校验规则
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个以上数字或字母'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3个以上的数字或字母'
    }
  ]
}

// 登录
const formRef = ref<InstanceType<typeof ElForm>>()
const store = useStore()
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate(() => {
    // 是否需要记住密码
    if (isKeepPassword) {
      // 本地缓存帐号密码
      localCache.setCache('name', account.name)
      localCache.setCache('password', account.password)
    } else {
      localCache.deleteCache('name')
      localCache.deleteCache('password')
    }
  })
  store.dispatch('login/accountLoginAction', { ...account })
}
// script setup 语法使用 defineExpose 暴露方法给父组件调用
defineExpose({
  loginAction
})
</script>

<style lang="scss">
.form-item {
  margin: 10px 0;
}
</style>
