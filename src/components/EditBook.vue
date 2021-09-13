<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑书籍</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="100px" :model="bookObj" style="margin-top:10px;width:70%">
      <el-form-item label="书籍封面" prop="fengmian">
        <!-- <template slot-scope="scope">
                  <img :src="scope.row.ImageUrl" alt="" width:100px height="150px">
        </template> -->
        <el-upload class="upload-demo" action="" :before-upload="beforeAvatarUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload_tip">只能上传jpg/png文件,且不超过500kb</div>
          <img :src="imageUrl" alt="" width="70px" height="100px">
        </el-upload>
      </el-form-item>
      <el-form-item label="书籍名称" prop="title">
        <el-input v-model="bookObj.Title"></el-input>
      </el-form-item>
      <el-form-item label="书籍价格" prop="price">
        <el-input v-model="bookObj.Price"></el-input>
      </el-form-item>
      <el-form-item label="书籍出版号" prop="isbn">
        <el-input v-model="bookObj.ISBN" disabled></el-input>
      </el-form-item>
      <el-form-item label="书籍描述" prop="desc">
        <el-input type="textarea" v-model="bookObj.Desc"></el-input>
      </el-form-item>
      <el-form-item label="书籍目录" prop="toc">
        <el-input type="textarea" v-model="bookObj.TOC"></el-input>
      </el-form-item>
      <el-form-item label="类别编号" prop="cid">
        <el-select v-model="bookObj.CategoryId" placeholder="请选择书籍类型" style="width:50%">
          <el-option v-for="item in bookTypeArr" :label="item.Name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版社编号" prop="pid">
         <el-select v-model="bookObj.PublishId" placeholder="请选择书籍类型" style="width:50%">
          <el-option v-for="item in PublishList" :label="item.Name":value="item.id" :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版日期" prop="publisherdate">
        <el-date-picker v-model="bookObj.PublishDate" type="date" style="width:50%"></el-date-picker>
        <!-- <el-input v-model="bookObj.PublishDate"></el-input> -->
      </el-form-item>
      <el-form-item label="书籍作者" prop="author">
        <el-input v-model="bookObj.Author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateBook">确定修改</el-button>
        <el-button type="primary" @click="toBookList">书籍列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
data(){
  return{
    bookObj:{
      BookId:"",
      Title:"",
      Price:"",
      ISBN:"",
      Desc:"",
      TOC:"",
      CategoryId:"",
      PublishId:"",
      PublishDate:"",
      Author:""
    },
    bookTypeArr:[],
    PublishList:[],
    imageUrl:"",
    booktype:"",
    publish:""
  }
},
created(){
  this.getBookType();
  this.getPublishList();
  let book=sessionStorage.getItem("currentBookInfo");
  this.bookObj=JSON.parse(book);
  this.imageUrl=JSON.parse(book).ImageUrl;
},
methods:{
      // 获取书籍类型
    getBookType() {
      this.$http.get("/bg/categoryquery?cname=" + this.booktype)
        .then(result => {
          // console.log(result);
          this.bookTypeArr = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取出版社列表
    getPublishList() {
      this.$http
        .get("/bg/publisherquery?pname=" + this.publish)
        .then(result => {
          // console.log(result);
          if (result.status == 200) {
            this.PublishList = result.data;
          }
        })
        .catch(err => {});
    },
    beforeAvatarUpload(file){
      this.imageUrl=file;
    },
    updateBook(){
      let fd=new FormData();
      let book=this.bookObj;
      // Object.keys(book).forEach((key)=>{
      //   fd.append(key,book[key]);
      //   console.log(key+":"+book[key])
      // });
      fd.append("title",book.Title);
      fd.append("price",book.Price);
      fd.append("bookid",book.BookId);
      fd.append("desc",book.Desc);
      fd.append("toc",book.TOC);
      fd.append("cid",book.CategoryId);
      fd.append("pid",book.PublishId);
      fd.append("publisherdate",book.PublishDate);
      fd.append("author",book.Author);
      fd.append("fengmian",this.imageUrl);
      this.$http.post("/bg/upupdatebook",fd,{
        headers: {'content-type': 'multipart/form-data'}
      }).then((res)=>{
        // console.log(res);
        if(res.data.status==200){
          this.$message.success(res.data.desc);
        }else{
          this.$message.error(res.data.desc);
        }
      })
    },
    toBookList(){
      this.$router.push("/booklist");
    }
}
}
</script>

<style>

</style>