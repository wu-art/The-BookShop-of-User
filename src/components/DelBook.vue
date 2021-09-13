<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>已下架书籍</el-breadcrumb-item>
    </el-breadcrumb>
    <p>
          <span>书名：</span>
          <span>{{book.Title}}</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
        return{
              BookList:[],
              book:{
                    Title:""
              }
        }
  },
  created(){
      let delbook=sessionStorage.getItem("delbook");
      this.book.Title=delbook
  },
  methods: {

  }
};
</script>

<style>
</style>