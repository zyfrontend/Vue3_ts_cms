<template>
  <div class="user">
    <el-card>
      <Search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      ></Search>
    </el-card>
    <el-card>
      <Content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
      </Content>
    </el-card>
    <Modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="ModalConfigRef"
    ></Modal>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import Search from '@/components/Search/index.vue'
import Content from '@/components/Content/index.vue'
import Modal from '@/components/Modal/index.vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/Hooks/usePageSearch'
import { usePageModal } from '@/Hooks/usePageModal'

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
// 新增组件渲染密码框
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
// 编辑组件不渲染密码框
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
// 动态添加部门,角色
const store = useStore()
const ModalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  departmentItem!.options = store.state.entireDepartment.map((item: any) => {
    return { title: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entireRole.map((item: any) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})
</script>
