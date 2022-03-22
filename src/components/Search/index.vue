<template>
  <div class="search">
    <Form v-bind="props.searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick">
            重置
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
          >
            搜索
          </el-button>
        </div>
      </template>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue'
import Form from '@/components/Form/index.vue'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

// 动态设置表单数据
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])
// 重置
const handleResetClick = () => {
  formData.value = formOriginData
  emit('resetBtnClick')
}
// 搜索
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style lang="scss" scoped>
.search {
  .handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
