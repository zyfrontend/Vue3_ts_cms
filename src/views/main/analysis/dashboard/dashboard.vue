<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <el-card>
          <h3>分类商品数量(饼图)</h3>
          <pieEchart :pieData="categoryGoodsCount"></pieEchart>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <h3>不同城市商品销量</h3>
          <mapEchart :mapData="addressGoodsSale"></mapEchart>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <h3>分类商品数量(玫瑰图)</h3>
          <roseEchart :soreData="categoryGoodsCount"></roseEchart>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <el-card>
          <h3>分类商品销量</h3>
          <lineEchart v-bind="categoryGoodsSale"></lineEchart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h3>分类商品收藏</h3>
          <barEchart v-bind="categoryGoodsFavor"></barEchart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import pieEchart from '@/components/Dashboard/pieEchart.vue'
import mapEchart from '@/components/Dashboard/mapEchart.vue'
import barEchart from '@/components/Dashboard/barEchart.vue'
import roseEchart from '@/components/Dashboard/roseEchart.vue'
import lineEchart from '@/components/Dashboard/lineEchart.vue'
const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

// 获取数据
const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return { xLabels, values }
})

const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { xLabels, values }
})

const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style lang="scss" scoped>
.content-row {
  margin-top: 20px;
}
</style>
