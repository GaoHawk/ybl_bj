<template>
  <div id="footer">
    <label class="bel">共计4166.03元</label>
    <label style="color:red;margin-left:8px;">可返0 元</label>
    <span class="gopay" style="background:#14B7DB;" @click="hedan = !hedan">{{ hedan?'去支付':'核对保单'}}</span>
  </div>
</template>
<style>
.gopay{
  float: right;
  width: 28%;
  text-align: center;
  font-size:18px;
  color: #fff;
}
.bel{
  color:#14b7db;
}
#footer{
  position: fixed;
  bottom:0;
  width: 100%;
  z-index: 100;
  padding-left: 11px;
  height:3.2rem;
  line-height: 3.2rem;
  background: #fff;
  border-top: 0.1rem solid rgb(221, 221, 221);
}
</style>
<script>
import head from './header'
  export default {
    name:"anime",
    data(){
      return {
        value:false,
        show:true,
        hedan:false,
        city:'',
        codeArr:[],
      }
    },
    components:{
      'child':head
    },
    methods:{
      modifyIns:function(){

      },
      next:function(){

      }
    }
  }
</script>
