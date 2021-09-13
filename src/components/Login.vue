<template>
  <div class="bgimg">
    <div class="login">
      <el-form label-width="100px" :model="loginForm" :rules="rules" ref="loginForm">
        <p class="userLogin">用户登录</p>
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="loginForm.loginName" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item prop="loginPwd">
          <span slot="label">密&emsp;码</span>
          <el-input v-model="loginForm.loginPwd" show-password style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="toLogin('loginForm')">登录</el-button>
          <el-button @click="reset('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div id="errorInfo">
        {{ errorMsg }}
      </div> 

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      errorMsg: "",
      loginForm: {
        loginName: "",
        loginPwd: "",
      },
      rules: {
        loginName: [{ required: true, message: "请输入用户名", trigger: "blur" },],
        loginPwd: [{ required: true, message: "请输入用户密码", trigger: "blur" },],
      },
    }
  },
  methods:{
    toLogin(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          let str="loginname="+this.loginForm.loginName+"&pwd="+this.loginForm.loginPwd+"&usertype=1";
          this.$http.post("/userlogin",str).then((res) => {
              // console.log(res)
              if (res.data.LoginState) {
                //获取token
							  let token=res.data.token; 
							  //将token存session存储
							  sessionStorage.setItem("token", token);
                sessionStorage.setItem("currentUser",this.loginForm.loginName);
                this.$router.push("/index");
                this.$message.success(res.data.statusdesc);
              }
            }).catch((err) => {
              this.errorMsg="用户名或密码不正确";
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    reset(loginForm){
      this.$refs[loginForm].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login{
  width: 500px;
  height: 320px;
  margin-left: 10%;
  margin-top: 13%;
  /* padding-top: 40px; */
  background-color:#FAAC58;
  opacity: 0.6;
}
.login .el-form .el-form-item__label{
  font-size: 20px;
  color: black;
}
.bgimg{
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: fixed;
  top: 0px; /*这里是设置与顶部的距离*/
  left: 0px; /*这里是设置与左边的距离*/
  bottom: 0px;
  right: 0px;
  background: url('../assets/images/bookLog.jpg');
  background-size: 100% 100%;
}
.userLogin{
  padding-top: 20px;
  font-family: "楷体";
  text-align: center;
  font-size: 25px;
}
#errorInfo{
  color: red;
  text-align: center;
  font-family: "楷体";
}
</style>
