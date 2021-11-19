<template>
  <div class="login-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号">
        <el-input v-model="phonecode.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="login-verify">
          <el-input v-model="phonecode.code" />
          <el-button class="verify-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    // 定义属性
    const phonecode = reactive({
      phone: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 定义方法
    const loginAction = () => {
      // formRef.value?.validate((valid) => {
      //   console.log('phoneAction', num)
      // })
      console.log('phoneAction')
    }
    return {
      phonecode,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped>
.login-phone {
  .login-verify {
    display: flex;
  }
  .verify-btn {
    margin-left: 5px;
  }
}
</style>
