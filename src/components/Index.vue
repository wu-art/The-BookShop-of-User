<template>
  <div>
    <el-container>
      <el-header style="height:80px">
        <span class="nav-one">管理员:{{curUser}}</span>
        <span class="nav-two">图书商城后台管理系统</span>
        <el-dropdown>
          <el-button type="primary">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <span @click="loginout()">退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item>系统设置</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="270px">
          <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">用户管理</span>
                </template>
                <el-menu-item index="UsersList">
                    <i class="el-icon-user"></i>
                    用户列表
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-office-building"></i>
                  <span>书籍管理</span>
                </template>
                <el-menu-item index="BookList">
                  <i class="el-icon-s-data"></i>
                  书籍列表
                  <!-- <router-link to="/fwlist">房屋列表</router-link> -->
                </el-menu-item>
                <el-menu-item index="AddBook">
                  <i class="el-icon-circle-plus-outline"></i>
                  书籍上架
                </el-menu-item>
                <el-menu-item index="DelBook">
                  <i class="el-icon-circle-close"></i>
                  下架书籍
                </el-menu-item>
                <el-menu-item index="EditBook">
                  <i class="el-icon-edit"></i>
                  修改书籍
                </el-menu-item>
                
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-notebook-2"></i>
                  <span slot="title">类型管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="BookType">
                    <i class="el-icon-s-grid"></i>
                    书籍类型
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <i class="el-icon-menu"></i>
                    类型添加
                  </el-menu-item>
                  <el-menu-item index="2-3">
                    <i class="el-icon-s-unfold"></i>
                    其他选项
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-star-on"></i>
                  <span slot="title">出版社管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="PublisherList">
                    <i class="el-icon-user"></i>
                    出版社列表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 订单模块 -->
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-shopping-cart-full"></i>
                  <span slot="title">订单管理</span>
                </template>
                <el-menu-item index="OrderList">
                  <i class="el-icon-shopping-cart-2"></i>
                  订单列表
                </el-menu-item>
              </el-submenu>
              <!-- 销量模块 -->
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span slot="title">销量排名</span>
                </template>
                <el-menu-item index="HisBookRank">
                  <i class="el-icon-notebook-1"></i>
                  历史书籍销量排名
                </el-menu-item>
                <el-menu-item index="YearBookRank">
                  <i class="el-icon-date"></i>
                  年书籍销量排名
                </el-menu-item>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
          <el-card class="box-card">
          <router-view />
          </el-card>
        </el-main>
      </el-container>
      <el-footer style="height:100px">
        <div class="footer">
          <p style="height:50px;margin-top:20px">&copy;xxx出版 | 作者:MisWu | 代码:60015260025sss</p>
          <p style="margin-top:-20px">书籍后台管理</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      curUser:""
    };
  },
  created(){
    this.curUser=sessionStorage.getItem("currentUser");
  },
  methods: {
    loginout(){
      this.$router.push("/");
    }
  },
};
</script>

<style>
.el-header{
  background-color: seagreen;
  color: white;
  font-family: "楷体";
  line-height: 80px;
  font-size: 25px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  /* line-height: 100px; */
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 720px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 720px;
}
.box-card {
  height: 100%;
  overflow: scroll;
}

.nav-two{ 
  margin-left: 30%;
}
.el-dropdown{
  float: right;
}
div.footer{
  color: gray;
}
</style>
