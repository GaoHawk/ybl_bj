import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import login from '@/components/login'
// import Foo from '@/components/foo'
// import Bar from '@/components/bar'
// import Notice from '@/components/notice'
// import homework from '@/components/homework'
// import c_notice from '@/components/createNotice'
// import firstTab from '@/components/tabbar'
// import pictureView from '@/components/picture'
// import pageNav from '@/components/pageNav'
// import yearIndex from '@/components/yearIndex'
// import comments from '@/components/comments'
import home from '@/components/home'
import picker from '@/components/picker'
import cityList from '@/components/cityList'
import carInfo from '@/components/carInfo'
import insurance from '@/components/insurance'
import brand from '@/components/brand'
import insPolicy from '@/components/insurancePolicy'
import insPrice from '@/components/insurancePrice'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:login
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'/picker',
      name:'picker',
      component:picker
    },
    {
      path:'/cityList',
      name:'cityList',
      component:cityList
    },
    {
      path:'/carInfo',
      name:'carInfo',
      component:carInfo
    },
    {
      path:'/insurance',
      name:'insurance',
      component:insurance
    },
    {
      path : '/brand',
      name :'brand',
      component:brand
    },
    {
      path:'/insPolicy',
      name:'insPolicy',
      component:insPolicy
    },
    {
      path:'/insPrice',
      name:'insPrice',
      component:insPrice
    }
  ]
})
