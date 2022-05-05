<template>
  <div class="container">
    <el-card class="card">
      <h3>注册</h3>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register()" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
      <p @click="login()">登录</p>
    </el-card>
  </div>
</template>

<script>

import qs from 'qs'

export default {
  name: 'Register',
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
      const res = await this.$http.post('/api/reguser', qs.stringify(this.form))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '注册成功',
          type: 'success'
        })
        this.$router.push('/login')
      } else if (res.data.status === 1) {
        this.$message({
          showClose: true,
          message: '注册失败',
          type: 'error'
        })
      } else {
        this.$message({
          showClose: true,
          message: '用户名已存在，请更换！',
          type: 'error'
        })
      }
    },
    login () {
      this.$router.push('/login')
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
