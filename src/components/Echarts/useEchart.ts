import * as echarts from 'echarts'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ChinaMapData from '@/utils/china.json'

// 地图信息
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const setResize = () => {
    echartInstance.resize()
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
    setResize
  }
}