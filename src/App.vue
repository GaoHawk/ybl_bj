<template>
  <div id="app">
   <keep-alive>
    <router-view :title="title"></router-view>
   </keep-alive>
  </div>
</template>

<script>

// import Notice from './component/notice.vue'
// import Bus from './common/bus.js'

export default {

  name: 'app',


  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      navs:[{name:'Foo',path:'/foo'},{name:'Bar',path:'/bar'},{name:'Toast',path:'/toast'}],
      todos: [
        'Do the dishes',
        'Take out the trash',
        'Mow the lawn'
      ],
      title:'',
      historySel:'',
    }
  },
  methods:{
      goRoute:function(item){
          console.log(item);
          // this.showHome = !this.showHome;
          // sessionStorage.showHome = this.showHome;
          this.$router.push({ path: item.path });
      }
  },
  mounted(){

      // let vm = this;
      // window.addEventListener("popstate", function(e) {
      //     // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能

      //     if(window.location.hash.substr(1) =='/home/pageNav' && vm.$route.matched[1] && vm.$route.matched[0].path == '/home'){

      //       vm.$store.commit('SET_INDEX_STA','');

      //     }else if(window.location.hash.substr(1) == '/home' && vm.$route.matched[0].path == '/home'){

      //        console.log(vm.selected);
      //        if(!vm.selected){
      //           vm.$store.commit('SET_INDEX_STA','全部');
      //           vm.$children[0].$refs.alllist.loadMore();
      //        }

      //       // console.log(vm.selected);

      //     }
      // }, false);

  }
}
</script>

<style>
/*@import "./assets/css/mint.css";*/
*{
   box-sizing: border-box;
}
body{
    overflow: hidden!important;
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    min-height: 100%;
    background: #f9f9f9;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  /* margin-top: 60px; */
}
*::before,*::after{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
