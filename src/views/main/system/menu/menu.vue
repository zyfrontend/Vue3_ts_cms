<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/menu.config'
import pageContent from '@/components/page-content'

export default defineComponent({
  name: 'menu',
  components: {
    pageContent
  },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
