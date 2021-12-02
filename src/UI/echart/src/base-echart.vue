<template>
  <div class="base-echart">
    <!-- 这里设置宽度会有警告,不设置宽度页面布局也没问题 -->
    <div ref="echartsRef" :style="{ height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'
const props = withDefaults(
  defineProps<{
    widht?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartsRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartsRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>
