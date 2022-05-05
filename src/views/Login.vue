<template>
  <div class="container">
    <el-card class="card">
      <h3>登录</h3>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login()" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
      <p @click="register()">注册</p>
    </el-card>
  </div>
</template>

<script>

import qs from 'qs'
// 导入token处理函数
import auth from '@/utils/auth.js'

export default {
  name: 'Login',
  data () {
    return {
      // 数据
      form: {
        username: '',
        password: ''
      },
      // 规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async register () {
      this.$router.push('/register')
    },
    async login () {
      const res = await this.$http.post('/api/login', qs.stringify(this.form))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        })
        auth.setToken(this.form.username)
        this.$router.push('/')
      } else {
        this.$message({
          showClose: true,
          message: '用户名或密码错误',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card{
width: 400px;
height: 400px;
margin: 200px auto;
  h3{
    width: 50px;
    height: 50px;
    margin-left: 164px;
  }
  .el-form {
    padding: 0 20px;
    .el-button {
        width: 100%;
    }
  }
  p{
    margin-left: 164px;
  }
}
</style>
