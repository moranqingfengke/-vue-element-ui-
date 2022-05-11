<template>
  <div class="borrow">
    <el-card>
      <el-table :data="books">
        <el-table-column prop="bookname" label="书名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="rebook(scope.row.bookname)" type="primary" circle plain>归还</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import qs from 'qs'
// 导入token处理函数
import auth from '@/utils/auth.js'

export default {
  name: 'Borrow',
  data () {
    return {
      books: [],
      username: ''
    }
  },
  methods: {
    // 获取图书
    async getbook () {
      const res = await this.$http.post('/borrow/getrebook', qs.stringify({ username: this.username }))
      this.books = res.data.message
    },
    // 归还
    async rebook (bookname) {
      const res = await this.$http.post('/borrow/returnbook', qs.stringify({ username: this.username, bookname: bookname }))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '归还成功',
          type: 'success'
        })
        this.getbook()
      }
    }
  },
  created () {
    this.username = auth.getToken()
    this.getbook()
  }
}
</script>

<style lang="less" scoped>
.borrow{
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .el-card{
    height: 100%;
  }
}
</style>
