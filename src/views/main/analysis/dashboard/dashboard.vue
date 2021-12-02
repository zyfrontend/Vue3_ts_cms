<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <zy-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </zy-card>
      </el-col>
      <el-col :span="10">
        <zy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </zy-card>
      </el-col>
      <el-col :span="7">
        <zy-card title="分类商品数量(玫瑰图)">
          <rose-echart :soreData="categoryGoodsCount"></rose-echart>
        </zy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <zy-card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </zy-card>
      </el-col>
      <el-col :span="12">
        <zy-card title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </zy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

// 组件
import ZyCard from '@/UI/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echart'
export default defineComponent({
  name: 'dashboard',
  components: {
    ZyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
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
    return {
      categoryGoodsCount,
      categoryGoodsFavor,
      categoryGoodsSale,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
