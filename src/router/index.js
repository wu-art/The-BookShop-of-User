import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import UsersList from '@/components/UsersList'
import BookType from '@/components/BookType' //书籍类别
import PublisherList from '@/components/PublisherList' //出版社列表
import BookList from '@/components/BookList'
import AddBook from '@/components/AddBook'
import DelBook from '@/components/DelBook'
import EditBook from '@/components/EditBook'
import OrderList from '@/components/OrderList'

// 销量排名
import HisBookRank from '@/components/bookrank/HisBookRank'
import YearBookRank from '@/components/bookrank/YearBookRank'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Login',component: Login},
    {path:'/index',name:'Index',component:Index,
      children:[
        {path:'/userslist',name:'UsersList',component:UsersList},
        {path:'/booktype',name:'BookType',component:BookType},
        {path:'/publisherlist',name:'PublisherList',component:PublisherList},
        {path:'/booklist',name:'BookList',component:BookList},
        {path:'/addbook',name:'AddBook',component:AddBook},
        {path:'/delBook',name:'DelBook',component:DelBook},
        {path:'/editBook',name:'EditBook',component:EditBook},
        {path:'/orderList',name:'OrderList',component:OrderList},
        {path:'/hisbookrank',name:'HisBookRank',component:HisBookRank},
        {path:'/yearbookrank',name:'YearBookRank',component:YearBookRank}
      ]
    }
  ]
})
