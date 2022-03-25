<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="menuFoldAction"
    ></i>
    <bread-crumb :breadCrumbInfo="breadCrumbInfo" />

    <div class="user-info">
      <div class="other-operate">
        <i @click="gotoGithub" class="icon-huaban881"></i>
      </div>
      <el-avatar
        size="medium"
        src="https://img-blog.csdnimg.cn/img_convert/c44557e91e69011385a02e707505b19a.png"
      ></el-avatar>
      <el-dropdown>
        <div class="el-dropdown-link">
          <span class="user-name">{{ userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-plus">我的信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" @click="exitLoginClic"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <nav-dialog ref="navDialogRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";

import BreadCrumb from "@/common-ui/breadcrumb";
import NavDialog from "./cpn/NavDialog.vue";

import { breadCrumbMapToMenu } from "@/utils/menuToRoute";
import localCache from "@/utils/cache";

export default defineComponent({
  emits: ["changeMenuFold"],
  name: "NavHeader",
  components: {
    BreadCrumb,
    NavDialog
  },
  setup(props, { emit }) {
    const isFold = ref(true);
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.state.login.userInfo);
    const breadCrumbInfo = computed(() => {
      const route = useRoute();
      const path = route.path;
      return breadCrumbMapToMenu(store.state.login.userMenus, path);
    });

    const menuFoldAction = () => {
      emit("changeMenuFold", isFold.value);
      isFold.value = !isFold.value;
    };
    // github图标
    const gotoGithub = () => {
      window.location.href = "https://github.com/zyfrontend/vue3_ts_cms";
    };

    // 退出登陆
    const exitLoginClic = () => {
      localCache.deleteCache("token");
      router.replace("/login");
    };
    // username
    const userName = ref(localCache.getCache("name"));
    return {
      userInfo,
      exitLoginClic,
      menuFoldAction,
      isFold,
      breadCrumbInfo,
      gotoGithub,
      userName
    };
  }
});
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  align-items: center;
  justify-content: space-evenly;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .bread-crumb {
    flex: 1;
    text-align: left;
    margin-left: 10px;
  }
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "iconfont";
    .other-operate {
      font-size: 25px;
      margin-right: 10px;
      i {
        margin: 0 12px;
        user-select: none;
        cursor: pointer;
      }
    }
    .user-name {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 15px;
      font-weight: 600;
    }
  }
}
</style>
