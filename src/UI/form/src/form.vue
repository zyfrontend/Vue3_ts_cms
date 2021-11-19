<template>
  <div class="zy-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemLayout"
            >
              <!-- 帐号或者密码框-->
              <template
                v-if="
                  item.type === 'id' ||
                  item.type === 'input' ||
                  item.type === 'password'
                "
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <!-- 下拉菜单选项 -->
              <template v-else-if="item.type === 'select'">
                <el-select style="width: 100%" :placeholder="item.placeholder">
                  <el-option
                    v-for="option in item.options"
                    :key="option.title"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <!-- 时间选项-->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../Types'
export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemLayout: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.zy-form {
  padding-top: 22px;
}
</style>
