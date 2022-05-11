<template>
  <el-container class="container">
    <el-aside width="200px">
      <el-menu
        background-color="#023"
        style="border-right:none"
        text-color="#fff"
        default-active="$route.path"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">用户详情</span>
        </el-menu-item>
        <el-menu-item index="/search">
          <i class="el-icon-document"></i>
          <span slot="title">图书搜索</span>
        </el-menu-item>
        <el-menu-item index="/need">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">提交需求</span>
        </el-menu-item>
        <el-menu-item index="/borrow">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">归还图书</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span style="margin-right:20px">{{user}}</span>
        <el-link @click="logout()" icon="el-icon-unlock" :underline="false">退出</el-link>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

// 导入token处理函数
import auth from '@/utils/auth.js'

export default {
  name: 'Layout',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = auth.getToken()
  },
  methods: {
    logout () {
      auth.delToken()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #023;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
