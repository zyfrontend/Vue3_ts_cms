<template>
  <div class="page-modal">
    <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      center
      title="新建用户"
      width="30%"
    >
      <Form v-model="formData" v-bind="modalConfig"></Form>
      <slot></slot>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primmary" @click="handleConfirmClick">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, defineExpose } from 'vue'
import { useStore } from '@/store'
import Form from '@/components/Form/index.vue'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  }
})

const store = useStore()
const formData = ref<any>({})
const dialogVisible = ref(false)
const handleConfirmClick = () => {
  dialogVisible.value = false

  // 新建 编辑
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}
defineExpose({
  handleConfirmClick,
  dialogVisible
})
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)
</script>
