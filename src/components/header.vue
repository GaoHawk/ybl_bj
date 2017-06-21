<template>
  <div id="header">
   <mt-header fixed :title="title" style="background:#fff;color:#333;height:3.2rem;line-height:3.2rem;border-bottom:0.1rem solid #ddd;"></mt-header>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
     computed:{
       ...mapState({
         title:state => state.title,
       })
     },
     name:'header',
     data(){
        return {
           username:'',
           password:'',
           account_state:'',
           pwd_state:''
        }
     }
  }
</script>
<style>

</style>

