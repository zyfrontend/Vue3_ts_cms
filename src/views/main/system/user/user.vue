<template>
  <div class="user">
    <zy-form v-bind="searchFromConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ZyForm from '@/UI/form'
// 导入配置
import { searchFromConfig } from './config/search.config'
export default defineComponent({
  name: 'user',
  components: {
    ZyForm
  },
  setup() {
    return {
      searchFromConfig
    }
  }
})
</script>

<style scoped></style>
