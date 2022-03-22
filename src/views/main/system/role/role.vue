<template>
  <div class="role">
    <el-card>
      <search :searchFormConfig="searchFormConfig"></search>
    </el-card>
    <el-card>
      <content
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></content>
    </el-card>
    <modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        show-checkbox
        node-key="id"
        :data="menus"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      ></el-tree>
    </modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'

// 组件
import Search from '@/components/Search/index.vue'
import Content from '@/components/Content/index.vue'
import Modal from '@/components/Modal/index.vue'
// 配置信息
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

// 工具
import { menuMapLeafKeys } from '@/utils/mapRoutes'

// hooks
import { usePageModal } from '@/Hooks/usePageModal'

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  undefined,
  editCallback
)

const store = useStore()
const menus = computed(() => store.state.entireMenu)
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped></style>
