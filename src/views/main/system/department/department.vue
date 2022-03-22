<template>
  <div>
    <h1>department</h1>
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
</script>
