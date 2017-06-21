<template>
   <div id="homeindex">
     <child prof="title"></child>
    <mt-field label="车牌号" placeholder="请输入车牌号"  v-model="carNumber"  class="carNumber custom-inputStyle" :readonly="readonly" @blur.native.capture="setInputCity" :attr="{ maxLength:10 }">
      <div >
        <input type="text" placeholder="省份"   class="secondInputStyle" v-model="province" @click="getProvince()" readonly="true" @blur="blurSelect">
      </div>
    </mt-field>
    <mt-field label="投保城市" placeholder="请选择投保城市" v-model="city" class="custom-inputStyle"  :readonly="true" @click.native.capture="getCity"></mt-field>
    <mt-field label="车主姓名" placeholder="请输入姓名" class="custom-inputStyle"  v-model="username" :attr="{ maxLength:20 }" @focus.native.capture="cancelCity"></mt-field>
    <mt-field label="联系手机" placeholder="请输入手机号" type="tel" class="custom-inputStyle"  v-model="phone" :attr="{ maxLength:15 }" @focus.native.capture="cancelCity">

    </mt-field>
    <div class="button" style="text-align:center">
        <mt-button size="normal" type="primary" style="width:60%;"
    @click="next()"
  >下一步</mt-button>
    </div>
    <label class="checkbox" @click="newCar()">
      <i class="reCheck"></i>
      新车
    </label>
    <pickUp  v-show="provinceOn" ref="picker"></pickUp>
    <city-picker  v-show="cityOn" ref="city_picker"></city-picker>

   </div>
</template>
<script>
import Header from './header'
import picker from './picker'
import cpicker from './cityPicker'
import { mapState } from 'vuex'
import  quote  from '../../common/comm.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
     beforeCreate(){
        let city = localStorage.tbCity;
        let code = localStorage.CityCode;
        console.log(city);
        console.log(code);
        if(city.length>0){
           this.$store.commit('SET_CITY',city);
           this.$store.commit('SET_CODE',code);
        }

     },
     mounted(){
        let _curl = quote.requrl + "/insuredbasedata?action=InsuredCityQuery";
        let cityList = [];
        let vm = this;
        if(sessionStorage.cityList){
          cityList = JSON.parse(sessionStorage.cityList);
          console.log(cityList);
          // localStorage.removeItem("cityList");
        }else{
          console.log(cityList);
          this.$http({
            method: 'post',
            url:_curl,
            data:{
              PartnerId:vm.partnerid
            }
          }).then(response => {
              var result = response.data.data;
              for(let i =0;i<result.length;i++){
                 if(result[i].CityList[0].LicenceCode !== null && result[i].CityList[0].LicenceCode.length>0){
                   result[i].provinceCode = result[i].CityList[0].LicenceCode.substr(0,1);
                 }else{
                   result[i].provinceCode = result[i].CityList[1].LicenceCode.substr(0,1);
                 }
              }
              console.log(result);
              sessionStorage.cityList = JSON.stringify(result);

          }, response => {

              console.log(response)
          })
        }

     },
     name:'home',
     computed:{
        ...mapState({
          province:state => state.province,
          provinceOn:state => state.provinceOn,
          cityOn:state => state.cityOn,
          city:state => state.city,
          cityCode:state => state.cityCode,
          partnerid:state => state.partnerid,
        })
     },
     components:{
        'child':Header,
        pickUp:picker,
        cityPicker:cpicker
     },
     data(){
        return {
           carNumber:'M88500',
           readonly:false,
           username:'zz',
           phone:'13111111111',
        }
     },
     methods:{
       newCar:function(){
         let label = document.querySelector('.checkbox .reCheck');
         let className = label.getAttribute('class');
         let pos =  className.indexOf('checked');
         if(pos<0){
          label.setAttribute('class','reCheck checked');
          this.readonly = true;
          this.carNumber = "新车"
          // this.$store.commit('SET_CITY','');
          this.$store.commit('SET_PROVINCE','');
         }else{
           label.setAttribute('class','reCheck');
           this.readonly = false;
           this.carNumber = '';
         }
       },
       getProvince:function(){
          this.$store.commit('SET_PR_ON',true);
          // this.$store.commit('SET_CITY_ON',false);
          this.$refs.picker.slots[0].values = quote.$abbList;
       },
       setCityPicker:function(cityList){
          this.$store.commit('SET_CITY_ON',true);
              var hotCityList = [],
                  tempArr = [],
                  hlist = [],
                  dicCode = quote.$DicHotCity;
              cityList.sort(function (a, b) {
                  return a.FullPin > b.FullPin ? 1 : -1;
              });
              cityList.forEach(function (pro) {
                  pro.show = false;
                  var item = dicCode[pro.Code];
                  if (!item) return;
                  if (!item.length) {
                      hlist.push(pro);
                      return;
                  }
                  pro.CityList.forEach(function (city) {
                      item.forEach(function (dcode) {
                          if (city.Code == dcode) {
                              hlist.push(city);
                          }
                      })
                  })
              })
              var clist = function (item) {
                  tempArr.push(item);
              };
              if (hlist.length) {
                  hlist.sort(function (a, b) {
                      return a.Code > b.Code ? 1 : -1;
                  });
                  hlist.forEach(function (item) {
                      clist(item);
                  })

                  if (tempArr.length) {
                      hotCityList.push(tempArr);
                  }
              }
              console.log(tempArr);
              // 设置热门城市选择
              let codeArr = [],
                  cities = [];
              for(let i =0;i<tempArr.length;i++){
                cities.push(tempArr[i].Name);
                codeArr.push(tempArr[i].Code);
              }
              this.$refs.city_picker.slots[0].values = cities;
              this.$refs.city_picker.codeArr = codeArr;
       },
       getCity:function(){
        //  this.$store.commit('SET_PR_ON',false);
          var vm = this;
          let cityList;
          if (!(sessionStorage.cityList) || sessionStorage.cityList.length == 0) {
              Indicator.open(`加载中...`);
              setTimeout(function(){
                  Indicator.close();
                  if(!(sessionStorage.cityList) || sessionStorage.cityList.length == 0){
                      Toast({
                          message: '加载失败',
                          position: 'bottom',
                          duration: 2000
                      });
                      return;
                  }else{
                    cityList = JSON.parse(sessionStorage.cityList);
                    vm.setCityPicker(cityList);
                  }
              },2200)
          }else{
            cityList = JSON.parse(sessionStorage.cityList);
            vm.setCityPicker(cityList);
          }
       },
       //用户写完车牌主动关联城市
       setInputCity(){
         this.carNumber = this.carNumber.toUpperCase();
         let lincenceCode,cityList,currentProvince;
         var vm = this;

         if(this.city.length>0) return;
         if(this.province.length>0 && this.carNumber.length >=1){
           lincenceCode = this.province + this.carNumber.charAt(0);
           console.log(lincenceCode);
           cityList = JSON.parse(sessionStorage.cityList);
           console.log(cityList);
            cityList.forEach(function(provinceArr){
                if(provinceArr.provinceCode === vm.province){
                  currentProvince = provinceArr;
                }
            });
            console.log(currentProvince)
            currentProvince.CityList.forEach(function(city){
              if(city.LicenceCode == lincenceCode){
                vm.$store.commit('SET_CITY',city.Name);
                localStorage.tbCity = city.Name;
                localStorage.CityCode = city.Code;
              }
            })
         }else{
           vm.$store.commit('SET_CITY','');
         }

       },
      //  失去焦点关闭选择项
      blurSelect(e,target){
          this.$store.commit('SET_PR_ON',false);
      },
      // 选择其他input取消选择城市
      cancelCity(){
        this.$store.commit('SET_CITY_ON',false);
      },
      //  下一步车辆信息
       next:function(){
         this.$store.commit('SET_CITY_ON',false);
         let bl = false;
         if(this.username.length >0 && this.city.length>0 && this.carNumber.length>0 && this.province.length>0 && quote.checkMobil(this.phone)){
            bl =true;
         }
         if(bl){
           this.$store.commit('SET_NAME',this.username);
           this.$store.commit('SET_PHONE',this.phone);
           this.$store.commit('SET_CAR_NUM',this.carNumber);
           this.$store.commit('ROUT_PATH','carInfo');
           console.log(this.$store);
         }else{
            Toast({
                message: '信息填写有误',
                position: 'bottom',
                duration: 2000
            });
         }

       }
     }
  }
</script>
<style>
  .secondInputStyle{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    border:0px;
    width:45px;
    position:absolute;
    right:7.8rem;
    bottom:-14px;
    font-size:1rem;
    outline:beige;
  }
  .custom-inputStyle{
    border-radius:0.5rem;
    margin-bottom:1rem;
    border:0.08rem solid #e5e5e5;
  }
  #picker{
    margin-top: 7rem;
  }
  #cpicker{
    margin-top: 5.5rem;
  }
  .checkbox{
    position: fixed;
    right:1rem;
    top: 3.5rem;
    font-size:1rem;
    color:#666;
    line-height: 4rem;
    padding-left: 0;
  }
  .reCheck::after{
    content: "";
    display: block;
    width:1.6rem;
    height:1.6rem;
    border-radius:0.5rem;
    border:0.1rem solid #17c3e5;
    background:none;
  }
  .reCheck.checked::before{
    content:'';
    display: block;
    position:absolute;
    width: 1.5rem;
    height:1.5rem;
    background: url(../assets/checked.png) no-repeat;
    background-size: cover;
  }
  .carNumber{
    width: 80%;
  }
  @media screen and (max-width:375px){
      .custom-inputStyle{
        margin-bottom: 0.7rem;
      }
      #picker{
        margin-top: 5.9rem;
      }
      #cpicker{
        margin-top: 4.4rem;
      }
   }
  @media screen and (max-width:360px){
      .custom-inputStyle{
        margin-bottom: 0.4rem;
        min-height: 44px;
      }
      #picker{
        margin-top: 5.2rem;
      }
      #cpicker{
        margin-top: 4rem;
      }
  }
  @media screen and (max-width:320px){
      .custom-inputStyle{
        margin-bottom: 0.4rem;
        min-height: 36px;
      }
      .checkbox{
        top:3.1rem;
        right:0.7rem;
      }
      .reCheck::after{
        width:1.35rem;
        height:1.35rem;
      }
      .reCheck.checked::before{
        width:1.15rem;
        height: 1.15rem;
      }
      .carNumber{
        width: 79%;
      }
      .secondInputStyle{
        right:7.3rem;
        bottom: -14px;
      }
      #picker{
        margin-top: 4.25rem;
      }
      #cpicker{
        margin-top: 2.45rem;
      }
  }
  #homeindex{
    margin-top: 4rem;
  }
  .mint-cell-wrapper .mint-cell-value input{
    text-align: right;
  }


  .check .reCheck{
    margin-right:0.5rem;
  }
  .reCheck{
    display: inline-block;
    position:relative;
    vertical-align:middle;
  }

</style>

