<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>类别管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍类别</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-input v-model="searchBookType" @clear="loadBookTypeList()" clearable style="width:40%;margin-top:10px"/>
    <el-button @click="searchBook" type="primary">搜索</el-button>
    <el-button @click="addBookTypeDia" type="primary">添加类型</el-button>
    <el-table :data="booktypeArr" style="width: 80%">
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column prop="Name" label="类别"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
              <el-button @click="delBookType(scope.row)" type="danger" size="small">删除类型</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加书籍类型弹出框 -->
    <el-dialog title="添加书籍类型" :visible.sync="addDialogVisible" width="30%">
      <el-input v-model="bookType" placeholder="请输入书籍类型" clearable/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBookType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booktypeArr: [],
      searchBookType: "",
      addDialogVisible:false,
      bookType:""
    };
  },
  created() {
    this.getBookType();
  },
  methods: {
    getBookType() {
      this.$http.get("/bg/categoryquery?cname=" + this.searchBookType).then(result => {
      //     console.log(result);
          this.booktypeArr = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索书籍类型
    searchBook() {
      this.getBookType();
    },
    // 搜索框恢复书籍类型列表
    loadBookTypeList() {
      this.getBookType();
    },
    // 添加书籍类型弹出框
    addBookTypeDia() {
          this.addDialogVisible=true;
    },
    // 添加书籍类型
    addBookType(){
          let reg=/\S+/;
          if(reg.test(this.bookType)){
            this.$http.post("/bg/addcategory?cname="+this.bookType).then((res)=>{
            //     console.log(res);
                if(res.data.status==200){
                      this.$message.success(res.data.desc);
                  //     this.booktypeArr.push(this.bookType);
                      this.getBookType();
                      this.addDialogVisible=false;
                }else{
                      this.$message.error(res.data.desc);
                }               
            })
          }else{
               this.$message.error("数据不合法");
          }
    },
    // 删除书籍类型
    delBookType(row) {
      //     console.log(row);
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
      this.$http.get("/bg/categorydelete?cid="+row.id).then((result) => {
            console.log(result)
            if(result.data.status==200){
                  this.$message.success(result.data.desc);
                  this.getBookType();
            }else{
                  this.$message.error(result.data.desc);
            }
      }).catch((err) => {
            console.log(err);
      });    
      }).catch(() => {
      this.$message({
            type: 'info',
            message: '已取消删除'
      });          
      });
    }
  }
};
</script>

<style>
</style>