<template>
  <div class="search">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable>
    </el-input>
    <el-button @click="getbook()" type="primary" icon="el-icon-search">搜索</el-button>
    <el-button @click="getAllBooks()" type="primary" icon="el-icon-search">全部书籍列表</el-button>
    <el-card>
      <el-table :data="books">
        <el-table-column prop="bookname" label="书名"></el-table-column>
        <el-table-column prop="bookauthor" label="作者"></el-table-column>
        <el-table-column prop="bookaddress" label="出版社"></el-table-column>
        <el-table-column prop="bookprice" label="价格"></el-table-column>
        <el-table-column prop="bookstate" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="a" v-if="!userstate">
            <el-button @click="detail(a.row.bookname)" type="primary" icon="el-icon-more" circle plain></el-button>
            <el-button @click="borrow(a.row.bookname)" type="primary" circle plain>借阅</el-button>
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
  name: 'Search',
  data () {
    return {
      // 搜索
      input: '',
      // 书
      books: [],
      // 详情
      bookdetail: '',
      // 用户
      username: '',
      // 用户状态（是否借过书）
      userstate: '',
      // 图书状态
      bookstate: ''
    }
  },
  methods: {
    // 获取全部书籍列表
    async getAllBooks () {
      const res = await this.$http.get('/book/getbook')
      this.books = res.data.message
    },
    // 搜索书
    async getbook () {
      const res = await this.$http.post('/book/bookdetail', qs.stringify({ bookname: this.input }))
      this.books = res.data.message
      if (this.books.length === 0) {
        this.$message({
          showClose: true,
          message: '没有该书，请到提交需求提交书名',
          type: 'warning'
        })
      }
      this.input = ''
    },
    // 详情
    async detail (bookname) {
      const res = await this.$http.post('/book/bookdetail', qs.stringify({ bookname: bookname }))
      this.bookdetail = res.data.message[0].bookdetail
      this.$message({
        showClose: true,
        message: this.bookdetail,
        type: 'success',
        duration: 0
      })
    },
    // 借阅
    async borrow (bookname) {
      const res = await this.$http.post('/borrow/borrowbook', qs.stringify({ bookname: bookname, username: this.username }))
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: '借书成功',
          type: 'success'
        })
        this.getAllBooks()
      }
    },
    // 获取用户状态
    async getUser () {
      const res = await this.$http.post('/api/userdetail', qs.stringify({ username: this.username }))
      this.userstate = res.data.message[0].userstate
    }
  },
  created () {
    this.getAllBooks()
    this.username = auth.getToken()
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.search{
  width: 100%;
  height: 100%;
  background:#f5f5f5 no-repeat center / contain;
  .el-input{
    width: 80%;
  }
  .el-card{
    height: 100%;
  }
}
</style>
