<template>
  <div class="need">
    <el-input
      placeholder="请输入图书名字"
      v-model="input"
      clearable>
    </el-input>
    <el-button @click="postbook()" type="primary">提交想添加图书名字</el-button>
    <el-button @click="getbooks()" type="primary">获取全部待添加图书</el-button>
    <el-card>
      <el-table :data="books">
        <el-table-column prop="bookname" label="书名"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import qs from 'qs'

export default {
  name: 'need',
  data () {
    return {
      // 输入框
      input: '',
      // 图书
      books: []
    }
  },
  methods: {
    // 添加图书
    async postbook () {
      if (this.input.length === 0) {
        this.$message({
          showClose: true,
          message: '请输入图书名',
          type: 'warning'
        })
      } else {
        const res = await this.$http.post('/need/addneed', qs.stringify({ bookname: this.input }))
        if (res.data.status === 0) {
          this.$message({
            showClose: true,
            message: '添加图书成功',
            type: 'success'
          })
          this.input = ''
          this.getbooks()
        } else {
          this.$message({
            showClose: true,
            message: '图书已存在，请耐心等待管理员添加',
            type: 'error'
          })
          this.input = ''
        }
      }
    },
    // 获取全部待添加图书
    async getbooks () {
      const res = await this.$http.get('/need/getneed')
      this.books = res.data.message
    }
  },
  created () {
    this.getbooks()
  }
}
</script>

<style lang="less" scoped>
.need{
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .el-input{
    width: 72%;
  }
  .el-card{
    height: 100%;
  }
}
</style>
