<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出版社管理</el-breadcrumb-item>
      <el-breadcrumb-item>出版社列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-input v-model="publish" @clear="loadPublishList()" clearable style="width:40%;margin-top:10px"/>
    <el-button @click="searchPublish" type="primary">搜索</el-button>
    <el-button type="primary" @click="addPublishDia">添加类型</el-button>
    <!-- 数据列表 -->
    <el-table :data="PublishList" style="width: 80%">
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column prop="Name" label="出版社名称"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
              <el-button @click="delPublish(scope.row)" type="danger" size="small">删除类型</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加出版社类型弹出框 -->
    <el-dialog title="添加出版社" :visible.sync="addPubDialog" width="30%">
      <el-input v-model="addpublish" placeholder="请输入出版社名称" clearable/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPubDialog = false">取 消</el-button>
        <el-button type="primary" @click="addPublish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
      data(){
            return{
                  publish:"", //模糊查询数据
                  PublishList:[],
                  addPubDialog:false,
                  addpublish:"" //添加出版社数据
            }
      },
      created(){
            this.getPublishList();
      },
      methods:{
            // 出版社列表
            getPublishList(){
                  this.$http.get("/bg/publisherquery?pname="+this.publish).then((result) => {
                        // console.log(result);
                        if(result.status==200){
                              this.PublishList=result.data;
                        }
                  }).catch((err) => {
                        
                  });
            },
            // 清除搜索框
            loadPublishList(){
                  this.getPublishList();
            },
            // 搜索  模糊查询
            searchPublish(){
                  this.getPublishList();
            },
            // 添加出版社弹出框
            addPublishDia(){
                  this.addPubDialog=true;
            },
            // 添加出版社
            addPublish(){
                  let reg=/\S+/;
                  if(reg.test(this.addpublish)){
                        this.$http.post("/bg/addpublisher?pname="+this.addpublish).then((result) => {
                        console.log(result.data);
                        if(result.data.status==200){
                              this.addPubDialog=false;
                               this.$message.success(result.data.desc);
                        }
                  }).catch((err) => {
                        console.log(err);
                  });
                  }else{
                        this.$message.error("数据不合法");
                  }
            },
            // 删除出版社
            delPublish(row){
                  let pid=row.id;
                  this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(() => {
                        this.$http.post("/bg/publisherdelete?pid="+pid).then((res) => {
                        // console.log(res);
                        if(res.data.status==200){
                              this.getPublishList();
                              this.$message.success(res.data.desc);
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