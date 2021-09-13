<template>
  <!-- // 历史书籍销量排名 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销量排名</el-breadcrumb-item>
      <el-breadcrumb-item>历史书籍销量</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 数据 -->
    <el-table :data="BookCount" style="width: 100%">
      <el-table-column prop="bookid" label="书籍编号" width="100">
      </el-table-column>
      <el-table-column prop="title" label="书籍名称" width="300" :formatter="getBookName">
      </el-table-column>
      <el-table-column prop="sum" label="销售量" width="100"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BookCount: [],
      bookArr:[]
    };
  },
  created() {
    this.getBookRank();
    this.getBookList();
  },
  methods: {
    //   书籍排名信息
    getBookRank() {
      this.$http.get("/bg/bookcount").then(res => {
        // console.log(res);
        if (res.status == 200) {
          this.BookCount = res.data;
        }
      });
    },
    getBookList(){
          this.$http.get("/bg/bookqueryadn?pagesize=500").then((res)=>{
            // console.log(res);
            this.bookArr=res.data.data;
          })
    },
    getBookName(row){
      // console.log(row)
      for(let i=0;i<this.bookArr.length;i++){
            if(row.bookid==this.bookArr[i].BookId){
                  return this.bookArr[i].Title;
            }
      }
    }
  }
};
</script>

<style>
</style>