<template>
  <div class="zy-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { breadcrumbType } from '../Types'
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<breadcrumbType[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.zy-breadcrumb {
}
</style>
