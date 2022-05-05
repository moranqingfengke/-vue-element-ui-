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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row.bookname)" type="primary" icon="el-icon-more" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import qs from 'qs'

export default {
  name: 'Search',
  data () {
    return {
      // 搜索
      input: '',
      // 书
      books: [],
      // 详情
      bookdetail: ''
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
    }
  },
  created () {
    this.getAllBooks()
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
