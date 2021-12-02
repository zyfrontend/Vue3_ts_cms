<template>
  <div class="page-modal">
    <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      center
      title="新建用户"
      width="30%"
    >
      <zy-form v-model="formData" v-bind="modalConfig"></zy-form>
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

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import ZyForm from '@/UI/form'

export default defineComponent({
  props: {
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
  },
  components: {
    ZyForm
  },

  setup(props) {
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
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    return {
      formData,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>
