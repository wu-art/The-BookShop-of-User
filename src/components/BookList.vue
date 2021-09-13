<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
    </el-breadcrumb>
      <!-- 搜索 -->
    <el-input v-model="title" @clear="loadPublishList()" clearable style="width:40%;margin-top:10px"/>
    <el-button @click="searchBook" type="primary">搜索</el-button>
    <el-button type="primary" @click="addBook">添加书籍</el-button>

    <el-table :data="BookList" style="width: 100%">
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column prop="ImageUrl" label="书籍封面">
            <template slot-scope="scope">
                  <img :src="`${scope.row.ImageUrl}`" alt="" width:100px height="150px">
              <!-- <el-avatar :src="`${scope.row.ImageUrl}`"></el-avatar> -->
            </template>   
      </el-table-column>
      <el-table-column prop="Title" label="书名"> </el-table-column>
      <el-table-column prop="Author" label="作者" width="50px"> </el-table-column>
      <el-table-column prop="CategoryName" label="类别名称"> </el-table-column>
      <el-table-column prop="PublishDate" label="出版日期" :formatter="formatDate">      
      </el-table-column>
      <el-table-column prop="PublishName" label="出版社名称"> </el-table-column>
      <el-table-column prop="Price" label="单价" width="50px"> </el-table-column>     
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">             
              <el-button type="danger" size="mini" @click="delBook(scope.row)">删除</el-button>
              <el-button type="success" size="mini" @click="toEdit(scope.row)">编辑</el-button>
              <el-button style="margin-top:5px;margin-left:0px" type="primary" size="mini" @click="showDia(scope.row)">更多信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 更多信息 对话框 -->
    <el-dialog title="其他书籍信息" :visible.sync="bookInfoDialog" width="80%">
      <span><span style="color:red">类别编号:</span>{{bookOtherInfo.CategoryId}}</span><br>
      <span><span style="color:red">书籍描述:</span>{{bookOtherInfo.Desc}}</span><br>
      <span><span style="color:red">ISBN号码:</span>{{bookOtherInfo.ISBN}}</span><br>
      <span><span style="color:red">出版社编号</span>:{{bookOtherInfo.PublishId}}</span><br>
      <span><span style="color:red">目录:</span>{{bookOtherInfo.TOC}}</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="bookInfoDialog = false">取 消</el-button>
            <el-button type="primary" @click="bookInfoDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals">
    </el-pagination>
  </div>
</template>

<script>
export default {
      data(){
            return{
                  BookList:[],
                  currentPage:1,
                  pageSize:4,
                  totals:0,
                  title:"",//书名  查询
                  cid:"",
                  pid:"",
                  bookInfoDialog:false,
                  bookOtherInfo:{
                        CategoryId:'',
                        Desc:'',
                        ISBN:'',
                        PublishId:'',
                        TOC:''
                  }
            }
      },
      created(){
            this.getBookList();
      },
      methods:{
            getBookList(){
                  let bookStr="currentpage="+this.currentPage+"&pagesize="+this.pageSize+"&title="+this.title+"&cid="+this.cid+"&pid="+this.pid;
                  this.$http.post("/bg/bookqueryadn",bookStr).then((result) => {
                        // console.log(result.data);
                        this.currentPage=result.data.cpage;
                        this.pageSize=result.data.currentrowtotal;//每页数据条数
                        // this.pageSize=result.data.size; //每页数据条数
                        this.BookList=result.data.data;
                        this.totals=result.data.rowtotal;
                        // console.log(this.BookList)
                  }).catch((err) => {
                        console.log(err);
                  });
            },
            // 分页
            handleSizeChange(val) {
                  this.pageSize=val;
                  this.getBookList();
                  console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                  this.currentPage=val;
                  this.getBookList();
                  console.log(`当前页: ${val}`);
            },
            // 格式化 出版社日期
            formatDate(val){
                  let date=val.PublishDate;
                  let str=date.substring(0,10)
                  return str;
            },
            // 下架  删除书籍
            delBook(row){
                  let bid=row.BookId;
                  this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(() => {
                        this.$http.post("/bg/downbook?bookid="+bid).then((res) => {
                        console.log(res);
                        if(res.data.status==200){
                              this.getBookList();
                              this.$message.success(res.data.desc);
                              sessionStorage.setItem("delbook",row.Title);
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
            },
            // 清空搜索框
            loadPublishList(){
                  this.getBookList();
            },
            // 搜索书籍  模糊查询
            searchBook(){
                  let bookStr="currentpage="+this.currentPage+"&pagesize="+this.pageSize+"&title="+this.title;
                  this.$http.post("/bg/bookquery",bookStr).then((result) => {
                        console.log(result.data);
                        this.currentPage=result.data.cpage;
                        this.pageSize=result.data.currentrowtotal;//每页数据条数
                        // this.pageSize=result.data.size; //每页数据条数
                        this.BookList=result.data.data;
                        this.totals=result.data.rowtotal;
                        // console.log(this.BookList)
                  }).catch((err) => {
                        console.log(err);
                  });
            },
            // 添加书籍
            addBook(){
                  this.$router.push("/addbook");
            },
            toEdit(row){
                  let strRow=JSON.stringify(row);
                  sessionStorage.setItem("currentBookInfo",strRow);
                  this.$router.push("/editbook");
            },
            // 显示更多信息 弹出框
            showDia(row){
                  this.bookInfoDialog=true;
                  this.bookOtherInfo.CategoryId=row.CategoryId;
                  this.bookOtherInfo.Desc=row.Desc;
                  this.bookOtherInfo.ISBN=row.ISBN;
                  this.bookOtherInfo.PublishId=row.PublishId;
                  this.bookOtherInfo.TOC=row.TOC;
            }
      }
};
</script>

<style>
</style>