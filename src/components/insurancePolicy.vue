<template>
  <div id="insurance" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <child></child>
    <div style="margin-top:3rem;" >
      <mt-cell :title="item.ins" v-for="(item,index) in insuranceArr"  :class="{ price_open: item.openSwitch }">
        <span class="custom-label" @click="openPri(item,index)">{{ item.value | formatState }}</span>
        <mt-switch v-model="item.value" @change.native.capture="changeIns(item,index)"  :class="{ switch_state: item.switch}">
        </mt-switch>
        <div class="selectPrice" v-if="item.switch" >
          <div class="custom_btnWidth" v-for="(n,ind) in item.btn" :style="{width:item.btnWidth + '%'}">
          <mt-button size="small" type="default" @click="changeState(ind,item)">{{ n }}</mt-button>
          </div>
        </div>
      </mt-cell>
    </div>
    <div style="text-align:center;">
      <mt-button size="normal" type="primary" style="width:60%;"
        @click="next()"
      >返回报价</mt-button>
    </div>
  </div>
</template>
<style>
  .switch_state{
    display:none;
  }
  .price_open{
    padding-bottom:60px;
  }
  .mint-button--small{
    padding:0 6px;
    height: 24px;
  }
  .custom_btnWidth{
    display:inline-block;
    margin-bottom: 6px;
    float: left;
  }
  .selectPrice{
    padding: 0 20px;
    position:absolute;
    width: 100%;
    left: 0;
    top: 50px;
    text-align: center;
  }
</style>
<script>
import quote from '../../common/comm.js'
import head from './header'
  export default {
    name:"anime",
    filters:{
      formatState:function(value){
         if(typeof(value) == 'boolean'){
            if(value){
              return '投保'
            }else{
              return '不投保'
            }
         }else{
            return value;
         }
      }
    },
    computed:{
      insuranceArr:function(){
        let insurance = [];

        for(var k in quote.$insCoverage){
            insurance.push({
              price:0,
              InsDetailId:k,
              ins: quote.$insCoverage[k],
              value:false,
              switch:false
            })
        }
        quote.currInsCoverage.forEach(function(arg){
           console.log(arg);
           for(let i=0;i< insurance.length;i++){
             if(insurance[i].InsDetailId === arg.InsDetailId){
               insurance[i].value=true;
             }
           }
        })
        for(let i=0;i<insurance.length;i++){
          switch(insurance[i].InsDetailId){
             case '10002':
             insurance[i].switch = true;
             insurance[i].btn = ['不投保','5万','10万','15万','20万','30万'];
             insurance[i].value = '30万';
             if(insurance[i].btn.length > 4){
               insurance[i].btnWidth = 100/4;
             }else{
              insurance[i].btnWidth = 100/insurance[i].btn.length;
             }
             break;
             case '10004':
             insurance[i].switch = true;
             insurance[i].btn = ['不投保','1万/座','2万/座','3万/座','4万/座','5万/座','10万/座']
             insurance[i].value = '1万/座';
             if(insurance[i].btn.length>4){
               insurance[i].btnWidth = 100/4;
             }else{
               insurance[i].btnWidth = 100/insurance[i].btn.length;
             }
             break;
             case '10005':
             insurance[i].switch = true;
             insurance[i].btn = ['不投保','1万/座','2万/座','3万/座','4万/座','5万/座','10万/座'];
             insurance[i].value = '4万/座';
             if(insurance[i].btn.length>4){
               insurance[i].btnWidth = 100/4;
             }else{
               insurance[i].btnWidth = 100/insurance[i].btn.length;
             }
             break;
             case '20201':
             insurance[i].switch = true;
             insurance[i].btn = ['不投保','国产玻璃','进口玻璃'];
             insurance[i].btnWidth = 100/insurance[i].btn.length;

             break;
             case '20202':
             insurance[i].switch = true;
             insurance[i].btn = ['不投保','2000','5000','10000','20000'];
             insurance[i].value = '2000';
             if(insurance[i].btn.length>4){
               insurance[i].btnWidth = 100/4;
             }else{
               insurance[i].btnWidth = 100/insurance[i].btn.length;
             }
             break;
          }
          let swStr = insurance[i].ins.indexOf('不计免赔');
          console.log(swStr);
          if(swStr>0){
             if(insurance[i].value == false){
               insurance[i].switch = true;
             }
          }
        }
        return insurance;
      }
    },
    data(){
      return {
        show:true,
        city:'',
        codeArr:[],
        wrapperHeight:'',
        btn:3,
        btnWidth:''
      }
    },
    components:{
      'child':head
    },
    methods:{
      modifyIns:function(){

      },
      next:function(){

      },
      changeIns:function(item,index){
        this.insuranceArr[index].value = !this.insuranceArr[index].value;
        let label = document.querySelectorAll('.mint-cell-value span.custom-label');
        if(this.insuranceArr[index].value){
          label[index].innerText = '投保'
        }else{
          label[index].innerText = '不投保'
        }
        if(index == 0){
          if(!item.value){
            $(label[15]).next().addClass('switch_state');
          }else{
            $(label[15]).next().removeClass('switch_state');
          }
          if(item.value == this.insuranceArr[15].value) return;
          $(label[15]).next().click();
        }else if(index == 2){
          if(!item.value){
            $(label[17]).next().addClass('switch_state');
          }else{
            $(label[17]).next().removeClass('switch_state');
          }
          if(item.value == this.insuranceArr[17].value) return;
          $(label[17]).next().click();
        }else if(index == 8){
          if(!item.value){
            $(label[21]).next().addClass('switch_state');
          }else{
            $(label[21]).next().removeClass('switch_state');
          }
          if(item.value == this.insuranceArr[21].value) return;
          $(label[21]).next().click();
        }
      },
      changeState:function(index,item){
         let btn = document.querySelectorAll('.selectPrice.opened .custom_btnWidth .mint-button');
         let classList = [];
         for(let i=0;i<btn[index].classList.length;i++){
           classList.push(btn[index].classList[i]);
         }
         let parentNode = btn[index].parentNode.parentNode.parentNode.parentNode.parentNode;
         parentNode.className = 'mint-cell';
         let label = btn[index].parentNode.parentNode.parentNode.firstChild;

         label.innerText = item.btn[index];
         item.value = item.btn[index];
         console.log(item.btn[index]);

        //  重启switch
         let parentN = $('.selectPrice.opened');
         if(item.btn[index] == '不投保'){
            let str = parentN.parent().parent().parent().text();
            let cell = $('.mint-cell-value span.custom-label');
            if(str.indexOf('三者责任险') > 0){
              $(cell[16]).next().addClass('switch_state');
              if(!this.insuranceArr[16].value) return;
              $(cell[16]).next().click();
            }else if(str.indexOf('司机责任险') > 0){
              $(cell[18]).next().addClass('switch_state');
              if(!this.insuranceArr[18].value) return;
              $(cell[18]).next().click();
            }else if(str.indexOf('乘客责任险') > 0){
              $(cell[19]).next().addClass('switch_state');
              if(!this.insuranceArr[19].value) return;
              $(cell[19]).next().click();
            }else if(str.indexOf('划痕险') > 0){
              $(cell[20]).next().addClass('switch_state');
              if(!this.insuranceArr[20].value) return;
              $(cell[20]).next().click();
            }
          //  item.switch = true;
          //  $(label).next().removeClass('switch_state');
         }else{
            let str = parentN.parent().parent().parent().text();
            let cell = $('.mint-cell-value span.custom-label');
            if(str.indexOf('三者责任险') > 0){
              $(cell[16]).next().removeClass('switch_state');
              if(this.insuranceArr[16].value) return;
              $(cell[16]).next().click();
            }else if(str.indexOf('司机责任险') > 0){
              $(cell[18]).next().removeClass('switch_state');
              if(this.insuranceArr[18].value) return;
              $(cell[18]).next().click();
            }else if(str.indexOf('乘客责任险') > 0){
              $(cell[19]).next().removeClass('switch_state');
              if(this.insuranceArr[19].value) return;
              $(cell[19]).next().click();
            }else if(str.indexOf('划痕险') > 0){
              $(cell[20]).next().removeClass('switch_state');
              if(this.insuranceArr[20].value) return;
              $(cell[20]).next().click();
            }
          //  item.switch = false;
          //  $(label).next().addClass('switch_state');
         }
      },
      openPri:function(item,index){
        let label = $('.custom-label')[index]
        let parent = $(label).parent().parent().parent();
        let sw = $(label).next();
        console.log($(label).next().next());
        let prev = $('.selectPrice.opened');
        if(prev.length>0){
           $('.selectPrice.opened').parent().parent().parent().removeClass('price_open');
           $('.selectPrice.opened').removeClass('opened');
        }
        $(label).next().next().addClass('opened');
        if(this.insuranceArr[0].value == false && index == 15) return;
        if(this.insuranceArr[2].value == false && index == 17) return;
        if(this.insuranceArr[8].value == false && index == 21) return;
        if(this.insuranceArr[1].value == '不投保' && index == 16) return;
        if(this.insuranceArr[3].value == '不投保' && index == 18) return;
        if(this.insuranceArr[4].value == '不投保' && index == 19) return;
        if(this.insuranceArr[7].value == '不投保' && index == 20) return;

        if(!item.switch) {
          sw.click();
          return;
        }else{

          parent.addClass('price_open');
        }

        // const style = $($(label).next()).attr('style');
        // if(style !== 'display: none;') return;
      }
    },
    mounted(){
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-45;
    }
  }
</script>
