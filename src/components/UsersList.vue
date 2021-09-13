<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="UserList" style="width: 100%">
      <el-table-column type="index" label="编号" > </el-table-column>
      <el-table-column label="用户头像" >
          <template slot-scope="scope">
              <el-avatar :src="`${baseUrl}${scope.row.Photo}`"></el-avatar>
          </template>
      </el-table-column>
      <el-table-column prop="LoginId" label="用户名称" width="180"> </el-table-column>
      <el-table-column prop="Name" label="真实姓名"> </el-table-column>
      <el-table-column prop="Mail" label="用户邮箱"> </el-table-column>
      <el-table-column prop="Phone" label="用户电话"> </el-table-column>
      <el-table-column prop="RoleName" label="用户角色" :formatter="getUserRole"> </el-table-column>
      <el-table-column prop="StateName" label="用户状态">        
        <template slot-scope="scope">  
            <!-- {{scope.row.StateName}}          -->
            <el-switch @change="changeState($event,scope.row)" v-model="scope.row.StateName" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>           
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            UserList:[],
            baseUrl:this.$http.defaults.baseURL,
            userState:""
        }
    },
    created(){
        this.getUserList();
    },
    methods:{
        // 获取用户列表
        getUserList(){
            this.$http.get("/bg/userlist").then((result) => {
                // console.log(result);
                this.UserList=result.data;
                for(let i=0;i<this.UserList.length;i++){
                    if(this.UserList[i].StateName==1){
                        this.UserList[i].StateName=true;
                    }else{
                        this.UserList[i].StateName=false;
                    }
                }
                // console.log(this.UserList);
            }).catch((err) => {
                console.log(err);
            });
        },
        // 改变用户角色
        getUserRole(){
            return "普通用户";
        },
        changeState(bool,row){
            let id=row.id;
            let StateName;
            if(bool){
                StateName=1;
            }else{
                StateName=0;
            }
            this.$http.get("/bg/userdisable?id="+id+"&StateName="+StateName).then((res)=>{
                // console.log(res);
                if(res.data.status==200){
                    this.$message.success(res.data.desc);
                }else{
                    this.$message.error(res.data.desc);
                }
            });
        }
    },
};
</script>

<style>
</style>