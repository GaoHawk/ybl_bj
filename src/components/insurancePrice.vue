<template>
  <div id="insurance" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <child></child>
    <div style="margin-top:3rem;" class="miancont">
      <div class="formInfo">
        <div class="formContent">
          <div class="qtbj_tlt">
             人保
             <label style="font-weight:normal" class="totalPrice">总价:￥4166.03</label>
          </div>
          <div class="qtbj_tlt1">报价险种</div>
          <div class="syx">
            商业险
            <span>2856.03元</span>
          </div>
          <div class="rbrq">起保日期
            <span>2017-06-09</span>
          </div>
          <div style="clear:both;"></div>
          <div class="hd" style="margin-top:5px;">
             险种
             <div style="float:right;">保费</div>
             <div style="float:right;margin-right:38px;">保额</div>

          </div>
           <mt-cell title="乘客不计免赔" class="custom-pd">
             <span style="margin-right:30px;">投保</span>
             <span>28.26</span>
           </mt-cell>
           <mt-cell title="乘客不计免赔" class="custom-pd">
             <span style="margin-right:30px;">投保</span>
             <span>28.26</span>
           </mt-cell>
            <mt-cell title="乘客不计免赔" class="custom-pd">
             <span style="margin-right:30px;">投保</span>
             <span>28.26</span>
           </mt-cell>
           <div class="syx">交强险<span>950元</span></div>
           <div class="rbrq" style="margin-bottom:20px;">起保日期<span>2017-06-09</span></div>
           <div class="syx ccs" style="margin-bottom:20px;">车船税<span>360元</span></div>
           <div class="qtbj_tlt1">车主信息</div>
           <mt-field label="姓名"  class="insPrice_inputS"   :readonly="true" ></mt-field>
           <mt-field label="身份证号码"  class="insPrice_inputS"   :readonly="true" ></mt-field>
            <mt-field label="手机号码"  class="insPrice_inputS"   :readonly="true" ></mt-field>

            <div class="qtbj_tlt1">被保人信息</div>
           <mt-field label="姓名"  class="insPrice_inputS"   :readonly="true" ></mt-field>
           <mt-field label="身份证号码"  class="insPrice_inputS"   :readonly="true" ></mt-field>
            <mt-field label="手机号码"  class="insPrice_inputS"   :readonly="true" ></mt-field>
           <div class="qtbj_tlt1">车辆详情</div>
           <mt-field label="车牌号"  class="insPrice_inputS"   :readonly="true" ></mt-field>
           <mt-field label="车架号"  class="insPrice_inputS"   :readonly="true" ></mt-field>
            <mt-field label="发动机号"  class="insPrice_inputS"   :readonly="true" ></mt-field>
            <mt-field label="品牌型号"  class="insPrice_inputS"   :readonly="true" ></mt-field>
           <mt-field label="初登日期"  class="insPrice_inputS"   :readonly="true" ></mt-field>
           <div class="qtbj_tlt1">配送详情</div>
           <mt-field label="收件人姓名" class="insPrice_inputS entry"    ></mt-field>
           <mt-field label="收件人电话"  class="insPrice_inputS entry"  ></mt-field>
            <mt-field label="收件人地址" class="insPrice_inputS entry"  ></mt-field>
            <mt-field label="详细地址"  class="insPrice_inputS entry"  ></mt-field>
            <mt-field label="电子邮箱" placeholder="请输入邮箱" class="insPrice_inputS entry"  ></mt-field>
            <mt-field label="验证码" placeholder="手机验证" class="insPrice_inputS entry"  ></mt-field>
        </div>
      </div>
    </div>
    <div class="agreement">
      <label><i class="reCheck checked"></i></label>
      我已阅读并同意
      <a class="ble">《投保协议》</a>和<a class="ble">《特约说明》</a>
      <div style="margin-top: 15px;color: red;">支付成功后，将直接返现到账户中</div>
    </div>
    <feet></feet>
  </div>
</template>
<style>
  .agreement{
    padding: 12px;
    font-size: 14px;
  }
  .insPrice_inputS.entry input{
    color:#222;
    background: #edf8fa;

  }
  .insPrice_inputS input{
    color:#17c3e5;

  }
  .insPrice_inputS{
    padding-left: 4px;
    min-height: 44px;
    border-top:2px dashed #ddd;
  }
  .syx.ccs{
    border-bottom: 2px solid #ddd;
  }
  .custom-pd .mint-cell-wrapper{
    padding: 0 0 0 12px;
  }
  .hd::after{
    clear:both;
  }
  .hd{
    color:#4ebee2;
    padding-left: 12px;
  }
  .rbrq span{
    float: right;
    color:#4ebee2;
  }
  .rbrq{
    padding: 4px 0 0 12px;
    height: 28px;
    line-height: 28px;
  }
  .syx span{
    float:right;
    color:red;
  }
  .syx{
    margin-left: 12px;
    border-bottom: 2px dashed #ddd;
    height: 40px;
    color: #1298c3;
    line-height: 28px;
    font-weight: bold;
  }
  .qtbj_tlt1{
    padding: 6px;
    border-left: 6px solid #17c3e5;
    margin-bottom: 10px;
  }
  .totalPrice{
    float:right;
    color: #ff7702;
    font-size: 17px;
    padding-left: 2%;
  }
  .formContent{
    background: #fff;
    padding:10px;
    /*margin-top: 116px;*/
  }
  .qtbj_tlt{
    padding: 10px;
    height: 58px;
    border-bottom:1px dotted #ddd;
    margin-bottom:10px;
  }
  .formInfo{
    margin-top: 4.5rem;
  }
  #insurance{
    overflow:scroll;
  }
</style>
<script>
import head from './header'
import feet from './footer'
  export default {
    name:"anime",
    data(){
      return {
        value:false,
        show:true,
        city:'',
        codeArr:[],
        wrapperHeight: 0
      }
    },
    components:{
      'child':head,
      'feet':feet
    },
    methods:{
      modifyIns:function(){

      },
      next:function(){

      }
    },
    mounted(){
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-45;
    }
  }
</script>
