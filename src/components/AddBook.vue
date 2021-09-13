<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍上架</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 书籍 表单 -->
    <el-form
      label-width="100px"
      :model="bookObj"
      :rules="rules"
      ref="bookRef"
      style="margin-top:10px;width:70%"
    >
      <el-form-item label="书籍封面" prop="fengmian">
        <!-- 必须设置action属性 -->
        <el-upload class="upload-demo" action="" :before-upload="beforeAvatarUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload_tip">只能上传jpg/png文件,且不超过500kb</div>
        </el-upload>
        
      </el-form-item>
      <el-form-item label="书籍名称" prop="title">
        <el-input v-model="bookObj.title"></el-input>
      </el-form-item>
      <el-form-item label="书籍价格" prop="price">
        <el-input v-model="bookObj.price"></el-input>
      </el-form-item>
      <el-form-item label="书籍出版号" prop="isbn">
        <el-input v-model="bookObj.isbn"></el-input>
      </el-form-item>
      <el-form-item label="书籍描述" prop="desc">
        <el-input v-model="bookObj.desc"></el-input>
      </el-form-item>
      <el-form-item label="书籍目录" prop="toc">
        <el-input v-model="bookObj.toc"></el-input>
      </el-form-item>
      <el-form-item label="类别编号" prop="cid">
        <el-select v-model="bookObj.cid" placeholder="请选择书籍类型" style="width:50%">
          <el-option
            v-for="item in bookTypeArr"
            :label="item.Name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版社编号" prop="pid">
        <!-- <el-input v-model="bookObj.pid"></el-input> -->
        <el-select v-model="bookObj.pid" placeholder="请选择书籍类型" style="width:50%">
          <el-option
            v-for="item in PublishList"
            :label="item.Name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版日期" prop="publisherdate">
        <el-date-picker v-model="bookObj.publisherdate" type="date" style="width:50%"></el-date-picker>
        <!-- <el-input v-model="bookObj.publisherdate"></el-input> -->
      </el-form-item>
      <el-form-item label="书籍作者" prop="author">
        <el-input v-model="bookObj.author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBook">确定上架</el-button>
        <el-button type="primary" @click="toBookList">书籍列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookObj: {
        title: "",
        price: "",
        isbn: "",
        desc: "",
        toc: "",
        cid: "",
        pid: "",
        publisherdate: "",
        author: ""
      },
      booktype: "",
      bookTypeArr: [],
      PublishList:[],
      publish:"",
      imageUrl:"",
      // 验证表单
      rules: {
        fengmian: [{ required: true, message: "请选择封面", trigger: "blur" }],
        title: [{ required: true, message: "请输入书名", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        isbn: [{ required: true, message: "请书籍出版号", trigger: "blur" }],
        desc: [{ required: true, message: "请输入书籍描述", trigger: "blur" }],
        toc: [{ required: true, message: "请输入目录", trigger: "blur" }],
        cid: [
          { required: true, message: "请输入书籍类型编号", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请输入出版社编号", trigger: "blur" }],
        publisherdate: [
          { required: true, message: "请选择出版时间", trigger: "blur" }
        ],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getBookType();
    this.getPublishList();
  },
  methods: {
    // 获取书籍类型
    getBookType() {
      this.$http
        .get("/bg/categoryquery?cname=" + this.booktype)
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
    // 书籍封面上传
    beforeAvatarUpload(file){
      this.imageUrl=file;
    },
    // 书籍上架
    addBook(){
      let fd=new FormData();
      let book=this.bookObj;
      // console.log(book);
      Object.keys(book).forEach((key)=>{
        fd.append(key,book[key]);
      });
      fd.append("fengmian",this.imageUrl);
      this.$http.post("/bg/upbook",fd,{
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
};
</script>

<style>

</style>