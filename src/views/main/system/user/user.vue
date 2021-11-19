<template>
  <div class="user">
    <zy-form v-bind="searchFromConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ZyForm from '@/UI/form'
import { IForm } from '@/UI/form/Types'
// 导入配置
import { searchFromConfig } from './config/search.config'
export default defineComponent({
  name: 'user',
  components: {
    ZyForm
  },
  setup() {
    //    const labelWidth = '120px'
    //    const colLayout = {
    //      span: 8
    //    }
    //    const itemLayout = {
    //      padding: '10px 40px'
    //    }
    //    const formItems = [
    //      {
    //        type: 'id',
    //        label: 'id',
    //        placeholder: '请输入id'
    //      },
    //      {
    //        type: 'input',
    //        label: '用户名',
    //        placeholder: '请输入用户名'
    //      },
    //      {
    //        type: 'password',
    //        label: '密码',
    //        placeholder: '请输入密码'
    //      },
    //      {
    //        type: 'select',
    //        label: '运动',
    //        placeholder: '请选择运动',
    //        options: [
    //          { title: '111', value: '1' },
    //          { title: '111', value: '2' }
    //        ]
    //      },
    //      {
    //        type: 'datepicker',
    //        label: '创建时间',
    //        otherOptions: {
    //          startPlaceholder: '开始时间',
    //          endPlaceholder: '结束时间',
    //          type: 'daterange'
    //        }
    //      }
    //    ]
    return {
      searchFromConfig
      //       formItems,
      //       labelWidth,
      //       itemLayout,
      //       colLayout
    }
  }
})
</script>

<style scoped></style>
