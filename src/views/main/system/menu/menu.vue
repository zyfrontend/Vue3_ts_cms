<template>
  <el-card>
    <Content :contentTableConfig="contentTableConfig" pageName="menu"></Content>
  </el-card>
</template>

<script lang="ts" setup>
import { contentTableConfig } from './config/menu.config'
import Content from '@/components/Content/index.vue'
</script>
