<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    // 定义属性
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
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
    // 定义方法
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        // 是否需要记住密码
        if (isKeepPassword) {
          // 本地缓存帐号密码
          localCache.setCache('name', account.name)
          localCache.setCache('password', account.password)
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }

        // 登录验证
        store.dispatch('login/accountLoginAction', { ...account })
      })
    }
    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>
