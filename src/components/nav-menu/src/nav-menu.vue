<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="../../../assets/img/logo.svg" alt="logo" class="img" />
      <span class="title" v-if="!isFold">Vue3+Ts</span>
    </div>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isFold"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="(item, index) in userMenu" :key="item.id">
        <el-sub-menu :index="index + ''">
          <template #title>
            <el-icon v-if="item.icon === 'el-icon-monitor'"
              ><monitor></monitor
            ></el-icon>
            <el-icon v-else-if="item.icon === 'el-icon-setting'"
              ><setting></setting
            ></el-icon>
            <el-icon v-else-if="item.icon === 'el-icon-goods'"
              ><goods></goods
            ></el-icon>
            <el-icon v-else-if="item.icon === 'el-icon-chat-line-round'"
              ><chatLineRound></chatLineRound
            ></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            :index="index + '-' + subIndex"
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
            >{{ subItem.name }}</el-menu-item
          >
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
export default defineComponent({
  props: {
    isFold: {
      type: Boolean
    }
  },
  setup() {
    const store = useStore();
    const userMenu = computed(() => {
      return store.state.loginModule.userMenu;
    });

    return {
      userMenu
    };
  }
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
