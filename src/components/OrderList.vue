<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline" style="margin-top:10px">
      <el-form-item>
        <el-input v-model="orderid" @clear="loadOrderList()" clearable placeholder="根据订单编号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchBookId">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="orderdate" @change="loadOrderInfo()" clearable placeholder="根据日期查询" type="date" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchOrderDate">查询</el-button>
      </el-form-item>
      <el-form-item>
         <el-select v-model="statetype" placeholder="请选择订单状态">
          <el-option v-for="item in orderArr" :label="item.title" :value="item.oId" :key="item.oId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getOrderState">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 订单数据 -->
    <el-table :data="orderData" style="width: 90%">
      <el-table-column type="index" label="序号" > </el-table-column>
      <el-table-column prop="orderId" label="订单编号" width="100px"> </el-table-column>
      <el-table-column prop="orderTime" label="下单时间"> </el-table-column>
      <el-table-column prop="bookId" label="书籍编号" width="100px"> </el-table-column>
      <el-table-column prop="bookPrice" label="书籍价格" width="100px"> </el-table-column>
      <el-table-column prop="orderState" label="订单状态"  width="100px"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="seen" type="primary" size="small" @click="sendGoods(scope.$index,scope.row)">发货<i class="el-icon-truck el-icon--right"></i></el-button>
          <el-button type="primary" size="small" @click="orderDetail()">详情<i class="el-icon-eleme el-icon--right"></i></el-button>
          <el-button v-if="see" type="danger" size="small">删除<i class="el-icon-delete el-icon--right"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情弹窗 -->
    <el-dialog title="进度提示" :visible.sync="detailDialogVisible" width="30%">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="orderState"></el-progress>
      <span style="color:red;font-size:20px;margin-top:10px">{{orderState | getGoodsInfo}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData:[],
      orderid:"",
      orderdate:"",
      statetype:0,
      orderArr:[
        {oId:0,title:"全部订单"},
        {oId:1,title:"已生成的订单"},
        {oId:2,title:"已发货的订单"},
        {oId:3,title:"已完成的订单"}
      ],
      seen:true,
      see:false,
      detailDialogVisible:false,
      orderState:100
    }
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      // orderid与orderdate参数,可为空,模糊查询
      // let searchStr="orderid="+this.orderid+"&orderdate="+this.orderdate;//使用post请求
      this.$http.get("/bg/orderqueryadn?orderid="+"&orderdate="+this.orderdate).then(result => {
          // console.log(result);         
          if(result.status==200){
            let dataArr=result.data;
            for(let i=0;i<dataArr.length;i++){
              let jsonData={orderId:"",orderTime:"",orderState:"",bookId:"",bookPrice:""};
              jsonData.orderId=dataArr[i].orderInfo.OrderId;
              jsonData.orderTime=dataArr[i].orderInfo.OrderDate;
              jsonData.orderState=dataArr[i].orderInfo.OrderState;             
              let bookInfo=dataArr[i].orderBooksInfo;
              for(let j=0;j<bookInfo.length;j++){
                jsonData.bookId=bookInfo[j].BookId;
                jsonData.bookPrice=bookInfo[j].UnitPrice;
                this.orderData.push(jsonData);
                // console.log(jsonData)
              }
            }
          }else{
            this.$message.error("请求错误");
          }
      }).catch(err => {
          console.log(err);
      });
    },
    // 根据订单编号查询信息
    searchBookId(){
      this.$http.get("/bg/orderqueryadn?orderid="+this.orderid+"&orderdate="+this.orderdate).then(result => {
          // console.log(result);  
          this.orderData.splice(0,this.orderData.length);     
          if(result.status==200){
            let dataArr=result.data;
            for(let i=0;i<dataArr.length;i++){
              let jsonData={orderId:"",orderTime:"",orderState:"",bookId:"",bookPrice:""};
              jsonData.orderId=dataArr[i].orderInfo.OrderId;
              jsonData.orderTime=dataArr[i].orderInfo.OrderDate;
              jsonData.orderState=dataArr[i].orderInfo.OrderState;             
              let bookInfo=dataArr[i].orderBooksInfo;
              for(let j=0;j<bookInfo.length;j++){
                jsonData.bookId=bookInfo[j].BookId;
                jsonData.bookPrice=bookInfo[j].UnitPrice;
                this.orderData.push(jsonData);
              }
            }
          }else{
            this.$message.error("请求错误");
          }
      }).catch(err => {
          console.log(err);
      });
    },
    // 清空id搜索框
    loadOrderList(){
      // this.getOrderList();
      this.searchBookId();
    },
    // 根据日期查询
    searchOrderDate(){
      this.$http.get("/bg/orderqueryadn?orderid="+this.orderid+"&orderdate="+this.orderdate).then(result => {
          // console.log(result);  
          this.orderData.splice(0,this.orderData.length);     
          if(result.status==200){
            let dataArr=result.data;
            for(let i=0;i<dataArr.length;i++){
              let jsonData={orderId:"",orderTime:"",orderState:"",bookId:"",bookPrice:""};
              jsonData.orderId=dataArr[i].orderInfo.OrderId;
              jsonData.orderTime=dataArr[i].orderInfo.OrderDate;
              jsonData.orderState=dataArr[i].orderInfo.OrderState;             
              let bookInfo=dataArr[i].orderBooksInfo;
              for(let j=0;j<bookInfo.length;j++){
                jsonData.bookId=bookInfo[j].BookId;
                jsonData.bookPrice=bookInfo[j].UnitPrice;
                this.orderData.push(jsonData);
              }
            }
          }else{
            this.$message.error("请求错误");
          }
      }).catch(err => {
          console.log(err);
      }); 
    },
    // 日期重新加载
    // loadOrderInfo(){
    //    this.getOrderList();
    // },
    // 根据订单状态查询
    getOrderState(){
      if(this.statetype==0 || this.statetype==1){
        this.seen=true;
      }else if(this.statetype==2){
        this.seen=false;
        this.see=false;
      }else if(this.statetype==3){
        this.seen=false;
        this.see=true;
      }
      this.$http.get("/bg/orderstatequery?statetype="+this.statetype).then((res)=>{
        // console.log(res);
        this.orderData.splice(0,this.orderData.length);
        if(res.status==200){
            let dataArr=res.data;
            for(let i=0;i<dataArr.length;i++){
              let jsonData={orderId:"",orderTime:"",orderState:"",bookId:"",bookPrice:""};
              jsonData.orderId=dataArr[i].orderInfo.OrderId;
              jsonData.orderTime=dataArr[i].orderInfo.OrderDate;
              jsonData.orderState=dataArr[i].orderInfo.OrderState;             
              let bookInfo=dataArr[i].orderBooksInfo;
              for(let j=0;j<bookInfo.length;j++){
                jsonData.bookId=bookInfo[j].BookId;
                jsonData.bookPrice=bookInfo[j].UnitPrice;
                this.orderData.push(jsonData);
                // console.log(jsonData)
              }
            }
        }else{
            this.$message.error("请求错误");
        }
      })
    },
    // 发货
    sendGoods(index,row){
      let orderId=row.orderId;
      this.$confirm('确定发货, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http.get("/bg/orderstatesend?orderid="+orderId).then((res)=>{
        // console.log(res);
        if(res.status==200){
          this.orderData.splice(index,1);
          this.$message.success(res.data.status);
        }else{
          this.$message.error("请求错误!");
        }
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发货'
        });          
      });
    },
    // 订单详情
    orderDetail(){
      this.detailDialogVisible=true;
    }
  },
  filters:{
    getGoodsInfo(val){
      if(val<100){
        return "已发货,商品还在路上";
      }else if(val === 100){
        return "商品已经被签收";
      }
    }
  }
};
</script>

<style>
</style>