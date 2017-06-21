<template>
  <div id="insurance">
    <child></child>
   <div class="form-open">
      <div class="form-header">
        报价险种
        <div class="right-icon" @click="modifyIns">
          <span class="pencil customStyle">|</span>
          <label style="font-weight:normal">修改险种</label>
        </div>
      </div>
      <div class="form-content">
        <span v-for="(item,index) in insuranceArr">{{item.ins}}<span v-if="item.Amount.length>0" style="color:#16B8D9;">({{item | formatPrice }})</span> <span v-if="(index+1)<insuranceArr.length">,</span> </span>
      </div>
   </div>
   <div class="qtbj">
      <mt-cell
        title="人保">
        <span class="ins-price">￥2836.50</span>
        <span>已报价</span>
      </mt-cell>
      <mt-cell
        title="人保"
        to="/insPrice"
        is-link
      >
      <span class="ins-price"><span style="color:#16B8DA;font-size:14px;">返0元</span> ￥2836.50</span>
      </mt-cell>
   </div>
   <div class="qtbj">
      <mt-cell
        title="人保">
        <span class="ins-price" v-show="baojia">￥2836.50</span>
        <span @click="baojia = !baojia">报价</span>
      </mt-cell>
      <mt-cell
        v-if="baojia"
        title="人保"
        to="/insPrice"
        is-link
      >
      <span class="ins-price"><span style="color:#16B8DA;font-size:14px;">返0元</span> ￥2836.50</span>
      </mt-cell>
   </div>
   <div class="qtbj">
      <mt-cell
        title="人保">
        <span class="ins-price" v-show="baojia">￥2836.50</span>
        <span @click="baojia = !baojia">报价</span>
      </mt-cell>
      <mt-cell
        title="人保"
        v-if="baojia"
        to="/insPrice"
        is-link
      >
      <span class="ins-price"><span style="color:#16B8DA;font-size:14px;">返0元</span> ￥2836.50</span>
      </mt-cell>
   </div>
  </div>
</template>
<style>
  .qtbj{
    margin-bottom: 15px;
  }
  .form-content{
    margin-top: 2px;
    padding:14px;
    border-top:4px dotted #ddd;
  }
  .customStyle{
    width:30px;
    color:white;
  }
  .pencil{
    background:url(../assets/pencil.png);
    background-size: cover;
    display: inline-block;
    height: 27px;
    line-height: 27px;
  }
  .right-icon{
    float: right;
  }
  .form-header{
    padding:10px;
    border-left: 10px solid #17c3e5;
  }
  .ins-price{
    color: #ff7702;
    padding-left: 1%;
    font-size:24px;
    position: absolute;
    right:37%;

  }
  .form-open{
    margin-top: 3rem;
    background: #fff;
    padding: 10px;
    margin-bottom: 40px;
  }
</style>
<script>
import quote from '../../common/comm.js'
import head from './header'
import { mapState } from 'vuex'
  export default {
    name:"anime",
    computed:{
      insuranceArr: function(){
        console.log(quote);
        let vm = this;
        let insurance = [];
        quote.currInsCoverage.forEach(function(arg){
           console.log(arg);
           for(var k in quote.$insCoverage){
             if(k === arg.InsDetailId){
               insurance.push({
                  ins: quote.$insCoverage[k],
                  Amount:arg.Amount,
                  seats:vm.seats
                })
             }
           }
        })

        return insurance;
      },
      ...mapState({
        seats:state => state.Seats
      })
    },
    filters:{
      formatPrice:function(value){
        if(!value.Amount) return '';
        let nm = value.Amount/10000;
        if(nm >= 1){
          if(value.ins == '乘客责任险'){
            return nm + '万*'+value.seats;
          }else{
            return nm + '万';
          }
        }else{
          if(value.ins == '乘客责任险'){
            return value.Amount +'*'+value.seats;
          }else{
            return value.Amount;
          }
        }
      }
    },
    data(){
      return {
        show:true,
        city:'',
        codeArr:[],
        baojia:false,
      }
    },
    components:{
      'child':head
    },
    methods:{
      modifyIns:function(){
        this.$store.commit('NEW_TITLE','险种修改');
        this.$store.commit('ROUT_PATH','/insPolicy');
      }
    }
  }
</script>
