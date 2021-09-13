<template>
  <!-- // 历史书籍销量排名 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销量排名</el-breadcrumb-item>
      <el-breadcrumb-item>年书籍销量</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input v-model="year" @change="getYear" style="width:30%;margin-top:20px"/>
    <!-- 数据 -->
    <el-table :data="yearBookCount" style="width: 100%">
      <el-table-column prop="bookid" label="书籍编号" width="100">
      </el-table-column>
      <el-table-column prop="sum" label="销售量" width="100"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yearBookCount: [],
      year:2019
    };
  },
  created() {
    this.getYearBookRank();
  },
  methods: {
    //   书籍排名信息
    getYearBookRank() {
      this.$http.get("/bg/bookcountyear?year="+this.year).then(res => {
      //   console.log(res);
        if (res.status == 200) {
          this.yearBookCount = res.data;
        }
      });
    },
    getYear(){
          this.getYearBookRank();
    }
  }
};
</script>

<style>
</style>