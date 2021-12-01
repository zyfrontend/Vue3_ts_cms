<template>
  <div class="rose-echart">
    <zy-echart :options="options"></zy-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { IDataType } from '../types'
import ZyEchart from '@/UI/echart'

const props = defineProps<{
  soreData: IDataType[]
}>()
const options = computed(() => {
  return {
    toolbox: {
      show: true
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.soreData
      }
    ]
  }
})
</script>
