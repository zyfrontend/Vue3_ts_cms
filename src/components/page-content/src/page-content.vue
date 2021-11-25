<template>
  <div class="page-content">
    <zy-table
      :title="title"
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      @selectionColumn="selectionColumn"
      v-model:page="pageInfo"
    >
      <template #headerHandle>
        <el-button v-if="isCreate" type="primary">新增</el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle="scope">
        <el-button v-if="isUpdate" icon="el-icon-edit" size="mini" type="text"
          >编辑</el-button
        >
        <el-button
          icon="el-icon-edit"
          v-if="isDelete"
          size="mini"
          type="text"
          style="color: red"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>
      <!-- 动态槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </zy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

import { useStore } from '@/store'
import ZyTable from '@/UI/table'
import { usePermissions } from '@/hooks/usePermissions'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    ZyTable
  },
  setup(props) {
    const store = useStore()
    // 获取操作权限
    const isCreate = usePermissions(props.pageName, 'create')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isDelete = usePermissions(props.pageName, 'delete')
    const isQuery = usePermissions(props.pageName, 'query')
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 分页器事件
    watch(pageInfo, () => getpageData())
    // 发送网络请求
    const getpageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getpageData()

    // 从vuex 获取数据列表
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    const selectionColumn = (value: any) => {
      console.log(value)
    }

    // 获取动态插槽
    const otherPropsSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )
    // 删除操作
    const handleDeleteClick = (data: any) => {
      console.log(data)
    }
    return {
      dataList,
      selectionColumn,
      getpageData,
      dataCount,
      pageInfo,
      otherPropsSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
