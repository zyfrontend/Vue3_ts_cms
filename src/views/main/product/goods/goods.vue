<template>
  <div class="goods">
    <el-card>
      <Content :contentTableConfig="contentTableConfig" pageName="goods">
        <template #image="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
          ></el-image>
        </template>
        <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
      </Content>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Content from '@/components/Content/index.vue'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
