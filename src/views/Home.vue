<template>
  <div class="home">
    <el-descriptions title="个人信息" direction="vertical" :column="1" border>
      <el-descriptions-item label="用户名">{{this.tip.username}}</el-descriptions-item>
      <el-descriptions-item label="密码">{{this.tip.password}}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{this.tip.age}}</el-descriptions-item>
      <el-descriptions-item label="修改密码">
        <el-input placeholder="请输入密码" v-model="input" show-password minlength="1"></el-input>
        <el-button @click="cp()" type="primary" class="btn">修改密码</el-button>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

import qs from 'qs'
// 导入token处理函数
import auth from '@/utils/auth.js'

export default {
  name: 'Home',
  data () {
    return {
      input: '',
      name: '',
      tip: {}
    }
  },
  async created () {
    this.name = auth.getToken()
    const res = await this.$http.post('/api/userdetail', qs.stringify({ username: this.name }))
    this.tip = res.data.message[0]
  },
  methods: {
    // 修改密码
    async cp () {
      if (this.input.length === 0) {
        this.$message({
          showClose: true,
          message: '密码不能为空',
          type: 'warning'
        })
      } else {
        const res = await this.$http.post('/api/updatepw', qs.stringify({ username: this.name, password: this.input }))
        if (res.data.status === 0) {
          this.$message({
            showClose: true,
            message: '修改密码成功',
            type: 'success'
          })
          this.input = ''
          this.getUser()
        } else {
          this.$message({
            showClose: true,
            message: '修改失败，稍后再试',
            type: 'error'
          })
        }
      }
    },
    // 获取个人信息
    async getUser () {
      const res = await this.$http.post('/api/userdetail', qs.stringify({ username: this.name }))
      this.tip = res.data.message[0]
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .btn{
    margin-top: 10px;
  }
}
</style>
