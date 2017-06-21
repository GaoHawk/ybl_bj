<template>
  <div id="detail" ref="detailRef" :style="{height:detailRefHeight + 'px'}">
    <v-header></v-header>
    <mt-field label="车架号" @blur.native.capture="queryFrame(insData.FrameNo)" placeholder="请输入车架号" v-model="insData.FrameNo" :style="inputStyle1"></mt-field>
    <mt-field label="发动机号" placeholder="请输入发动机号" v-model="insData.EngineNo" :style="inputStyle"></mt-field>
    <mt-field label="初登日期" @click.native.capture="open('picker2')"
    endDate = "new Date()"
    v-model="ComFirstRegisterDate" :style="inputStyle" :readonly="readonly">
      <!--<div>
              <input @focus="open('picker2')" size="large" v-model="insData.biBeginDate" placeholder="请输入日期">
          </div>-->
    </mt-field>
    <mt-datetime-picker ref="picker2" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-model="ComFirstRegisterDate" @confirm="handleChange"></mt-datetime-picker>
    <mt-field label="品牌型号" @click.native.capture="routerLink(insData.LicenseNo,insData.FrameNo)" v-model="insData.DefaultModelName" :style="inputStyle"></mt-field>
    <mt-field label="车主身份证" placeholder="请输入身份证" v-model="insData.ownerIDCard" :style="inputStyle"></mt-field>
    <mt-field label="车主手机号" placeholder="请输入车主手机号" v-model="insData.ownerMobile" :style="inputStyle"></mt-field>
    <mt-cell :title="'被保人信息'" :style="inputStyle">
      <span style="text-align:right;">同车主&nbsp;</span>
      <mt-switch v-model="switchOpen" @change="switchChange"></mt-switch>
    </mt-cell>
    <div id="boxHeight" class="recognizee-box" v-if="!switchStatus" style="margin-bottom:1rem;">
      <mt-field label="姓名" placeholder="请输入姓名" v-model="insData.insuredName" :style="inputStyle"></mt-field>
      <mt-field label="身份证" placeholder="请输入身份证" v-model="insData.insuredIDCard" :style="inputStyle"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" v-model="insData.insuredMobile" :style="inputStyle"></mt-field>
    </div>
    <mt-button @click="submitCarInfo" :style="btnStyle" size="large" type="primary">获取报价</mt-button>
  </div>
</template>
<script>
import Header from './header'
import quote from '../../common/comm.js'
import { Toast, MessageBox, Indicator } from 'mint-ui'
import { mapState } from 'vuex'
import bus from '../../common/bus.js'
export default {
  name: 'detail',
  computed: {
    ...mapState({
      province: state => state.province,
      carNumber: state => state.carNumber,
      CityCode: state => state.cityCode,
      PartnerId: state => state.partnerid,
      userName: state => state.username,
      OwnerMobile: state => state.phone
    }),
    ComFirstRegisterDate() {
      let date = this.insData.FirstRegisterDate;
      console.log('date:', Boolean(date))
      if (date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      } else {
        let nowTime = new Date();
        return nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1) + "-" + nowTime.getDate();
      }
    },
    nowDate (){
      return new Date();
    }
  },
  data() {
    return {
      switchLabel: '同车主',
      switchOpen: true,
      switchStatus: true,
      str: '666',
      detailRefHeight: 500,
      insData: {
        FrameNo: '',
        LicenseNo: '',
        EngineNo: '',
        FirstRegisterDate: '',
        BrandModel: '',
        DefaultModelName: '',
        DefaultModelCode: '',
        biBeginDate: '',
        ciBeginDate: '',
        ownerIDCard: '',
        ownerMobile: '',
        insuredName: '',
        insuredIDCard: '',
        insuredMobile: ''
      },
      popupVisible: false,
      datePickVal: new Date(),
      inputStyle: {
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        border: '0.08rem solid #e5e5e5',
      },
      inputStyle1: {
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        border: '0.08rem solid #e5e5e5',
        marginTop: '1rem'
      },
      btnStyle: {
        marginBottom: '2rem'
      },
      readonly: true
    }
  },
  components: {
    'v-header': Header
  },
  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    queryFrame(val) {
      console.log('queryFrame:', val.length);
      let that = this;
      if (val.length === 17) {
        let postData = {
          CityCode: this.CityCode,
          FrameNo: val,
          partnerid: this.PartnerId
        }
        this.$http({
          method: "POST",
          url: quote.requrl + '/insuredcarinfo?action=CarInfoQuery',
          data: postData
        })
          .then(function (res) {
            let carInfo = res.data.CarInfo;
            if (res.data.ResultCode == 0) {
              //that.insData.FrameNo = carInfo.FrameNo;
              that.insData.EngineNo = carInfo.EngineNo;
              that.insData.LicenseNo = carInfo.LicenseNo;
              that.insData.FirstRegisterDate = new Date(carInfo.FirstRegisterDate);
              let $DefaultModelName = carInfo.CarModelList.length == 0 ? '' : carInfo.CarModelList[0].FamilyName + ' ' + carInfo.CarModelList[0].ParentVehName;
              that.insData.DefaultModelName = $DefaultModelName;
              that.insData.DefaultModelCode = carInfo.DefaultModelCode;
              that.quotation();
              return
            } else if (res.data.ResultCode == 1) {
              console.log('ReturnMessage:', res.data.ReturnMessage);
              MessageBox.alert('此车架号未匹配到数据!', '提示');
              return
            } else if (res.data == false) {
              MessageBox.alert('接口访问失败！', '提示');
              return
            }
            Indicator.close();
          })
          .catch(function (err) {
            Indicator.close();
            console.log('catch', err);
          });
      } else {
        MessageBox({
          message: '请输入17位车架号'
        });
        return;
      }
    },
    handleChange(value) {
      Toast({
        message: '已选择 ' + value.toString(),
        position: 'bottom'
      });
      this.insData.FirstRegisterDate = value;
      //console.log('date:',value)
    },
    switchChange(event) {
      this.switchStatus = this.switchOpen;
      console.log(' this.switchStatus', this.switchStatus, this.switchOpen, event)
    },
    routerLink(li, fr) {
      this.$store.commit('SET_LICENSENO', li);
      this.$store.commit('SET_FRAMENO', fr);
      this.$store.commit('NEW_TITLE', '车型选择');
      this.$router.push({ path: '/brand' })
    },
    submitCarInfo() {
      let that = this,
        postData = that.insData,
        $currInsCoverage = quote.currInsCoverage;
      console.log('submitPost:', postData)

      let ins = that.insData,
        frameno = ins.FrameNo.trim(),
        engineNo = ins.EngineNo.trim(),
        biBeginDate = String(ins.FirstRegisterDate).trim(),
        defaultModelName = ins.DefaultModelName.trim(),
        ownerIDCard = ins.ownerIDCard.trim(),
        ownerMobile = ins.ownerMobile.trim(),
        insuredName = ins.insuredName.trim(),
        insuredIDCard = ins.insuredIDCard.trim(),
        insuredMobile = ins.insuredMobile.trim(),
        isCarOwner = this.switchStatus,
        InsuredInfo = {
          Name: that.userName,  //this.userName
          Mobile: ownerMobile, //ownerMobile
          IDCard: ownerIDCard //insuredIDCard
        };
      //isCarOwner = insInfo.isCarOwner;

      //是否为同车主
      console.log('insuredIDCard:', insuredIDCard)
      if (!isCarOwner) {
        // 是同车主
        InsuredInfo.Name = insuredName;
        InsuredInfo.IDCard = insuredIDCard;
        InsuredInfo.Mobile = insuredMobile;
      }

      // let params = {
      //   PartnerId: this.PartnerId,
      //   FrameNo: frameno,
      //   CityCode: '00117001', //this.CityCode
      //   biBeginDate: '2016-07-21',
      //   ciBeginDate: '2016-07-21',
      //   CarInfo: {
      //     LicenseNo: "鲁M88500",  //this.LicenseNo
      //     EngineNo: "870**86", //engineNo
      //     OwnerName: "陈阳", //this.userName
      //     OwnerMobile: "13420011111", //ownerMobile
      //     CertificateNO: "220284198711124612", //insuredIDCard
      //     DefaultModelCode: "3cb9c6d60d7c455985228c626299ab6d" //this.insData.DefaultModelCode
      //   },
      //   ApplicantInfo: {
      //     Name: '陈阳',  //this.userName
      //     Mobile: '13420011111', //ownerMobile
      //     IDCard: '220284198711124612' //insuredIDCard
      //   },
      //   InsuredInfo: {
      //     Name: '陈阳',
      //     Mobile: '13420011111',
      //     IDCard: '220284198711124612'
      //   },
      //   SupplierIds: [this.SupplierIds],
      //   CoverageList: [
      //     {
      //       InsDetailId: '10001',
      //       Amount: '',
      //     },
      //     {
      //       InsDetailId: '10002',
      //       Amount: '300000',
      //     }
      //   ]
      // }
      console.log('LicenseNo:', that.LicenseNo)
      let params = {
        PartnerId: that.PartnerId,
        FrameNo: frameno,
        CityCode: that.CityCode,
        biBeginDate: that.insData.biBeginDate,
        ciBeginDate: that.insData.ciBeginDate,
        CarInfo: {
          LicenseNo: that.insData.LicenseNo,
          EngineNo: engineNo,
          OwnerName: that.userName,
          OwnerMobile: ownerMobile,
          CertificateNO: ownerIDCard,
          DefaultModelCode: that.insData.DefaultModelCode,
        },
        ApplicantInfo: {
          Name: that.userName,
          Mobile: ownerMobile,
          IDCard: ownerIDCard,
        },
        InsuredInfo: {
          Name: InsuredInfo.Name,
          Mobile: InsuredInfo.Mobile,
          IDCard: InsuredInfo.IDCard
        },
        SupplierIds: [that.SupplierIds],
        CoverageList: $currInsCoverage
      }
      if (!frameno) {
        if (!info || !info.baseInfo || !info.baseInfo.LicenceCode) {
          MessageBox({
            message: '请输入17位车架号'
          });
          return;
        }
      }
      if (frameno && frameno.length < 17) {
        MessageBox({
          message: '请输入17位车架号'
        });
        return;
      }
      if (!engineNo) {
        MessageBox({
          message: '请输入发动机号'
        });
        return;
      }
      if (!biBeginDate) {
        MessageBox({
          message: '请输入初登日期'
        });
        return;
      }
      if (!defaultModelName) {
        MessageBox({
          message: '请选择品牌型号'
        });
        return;
      }
      if (!ownerIDCard) {
        MessageBox({
          message: '请输入车主身份证号'
        });
        return;
      }
      console.log(ownerIDCard)
      console.log(quote)
      if (!quote.IdentityCodeValid(ownerIDCard)) {
        console.log(ownerIDCard)
        console.log(quote.IdentityCodeValid)
        MessageBox({
          message: '请输入有效的车主身份证号'
        });
        return;
      }
      if (!ownerMobile) {
        MessageBox({
          message: '请输入车主手机号'
        });
        return;
      }
      if (!quote.checkMobil(ownerMobile)) {
        MessageBox({
          message: '请输入有效的车主手机号'
        });
        return;
      }
      if (!isCarOwner) {
        if (!quote.IdentityCodeValid(insuredIDCard)) {
          console.log(insuredIDCard)
          console.log(quote.IdentityCodeValid)
          MessageBox({
            message: '请输入有效的被保人身份证号'
          });
          return;
        }
        if (!quote.checkMobil(insuredMobile)) {
          MessageBox({
            message: '请输入有效的被保人手机号'
          });
          return;
        }
      }
      // if (!isCarOwner) {
      //   if (!insuredName) {
      //     MessageBox({
      //   title: '提示',
      //   message: '确定执行此操作?',
      //   showCancelButton: true
      // });
      //     return;
      //   }
      //   if (!insuredIDCard) {
      //     MessageBox({
      //   title: '提示',
      //   message: '确定执行此操作?',
      //   showCancelButton: true
      // });
      //     return;
      //   }
      //   if (!quote.IdentityCodeValid(insuredIDCard)) {
      //           MessageBox({
      //   title: '提示',
      //   message: '确定执行此操作?',
      //   showCancelButton: true
      // });
      //     return;
      //   }
      //   if (!insuredMobile) {
      //      MessageBox({
      //   title: '提示',
      //   message: '确定执行此操作?',
      //   showCancelButton: true
      // });
      //     return;
      //   }
      //   if (!quote.checkMobil(insuredMobile)) {
      //       MessageBox({
      //   title: '提示',
      //   message: '确定执行此操作?',
      //   showCancelButton: true
      // });
      //     return;
      //   }
      // }

      // 获取报价请求
      console.log('params:', params);
      Indicator.open({
      text: '获取中...',
      spinnerType: 'fading-circle'
    });
      this.$http({
        method: "POST",
        url: quote.requrl + '/insured?action=InsuredPrice',
        data: params
      }).then(function (res) {
        console.log('已提交！',res);
        let statusCode = res.data.ResultCode,
         transData = res.data;
        if(statusCode === 0){
          that.$store.commit('NEW_TITLE', '报价列表');
          that.$store.commit('ROUT_PATH', '/insurance');
        }else {
          console.log('statusCode',statusCode)
          MessageBox.alert('获取报价失败！')
        }
        bus.$emit('transInsuredPrice', transData);
        Indicator.close();
      }).catch(function (err) {
        Toast({
          message: '接口访问失败！',
          position: 'bottom',
          duration: 2500
        });
        console.log('catch', err);
      })
    },
    quotation() {
      let that = this, postData = {
        PartnerId: this.PartnerId,
        CityCode: this.CityCode,
        CarInfo: {
          LicenseNo: this.insData.LicenseNo
        }
      };
      console.log('quotation:', postData)
      this.$http({
        method: "POST",
        url: quote.requrl + '/insured?action=NextQuotation',
        data: postData
      }).then(function (res) {
        console.log('res:', res.data);
        let statusCode = res.data.ResultCode;
        if(statusCode === 0){
          that.insData.biBeginDate = res.data.BILastEffectiveDate.substring(0,10);
          that.insData.ciBeginDate = res.data.CILastEffectiveDate.substring(0,10);
        }else{
          console.log(res.data.ReturnMessage)
        }

      }).catch(function (err) {
        console.log('catch', err);
      })
    },
    say() {
      console.log('say666:', this.insData.DefaultModelName);
    }
  },
  mounted() {
    let $r = window.getComputedStyle(document.documentElement)["fontSize"];
    this.detailRefHeight = document.documentElement.clientHeight - 3 * ($r.substring(0, 2));
  },
  activated() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    console.log('activated-$store:', this.$store.state);

    this.insData.ownerMobile = this.OwnerMobile;
    let that = this,
      $carInfo = that.insData;
    bus.$on('transCarModelName', (obj) => {
      that.insData.DefaultModelName = obj.FamilyName + ' ' + obj.ParentVehName;
    })

    if (this.carNumber == '新车') {
      console.log('this is newCar')
      setTimeout(() => {
        Indicator.close();
      }, 500)
    } else {
      let postData = {
        partnerid: this.PartnerId,
        LicenseNo: this.province + this.carNumber,
        CityCode: this.CityCode
      }
      if ($carInfo.LicenseNo && $carInfo.EngineNo && $carInfo.FirstRegisterDate && $carInfo.DefaultModelName) {
        console.log('insData数据存在！#######');
        setTimeout(() => {
          Indicator.close();
        }, 200)
      } else {
        this.$http({
          method: "POST",
          url: quote.requrl + '/insuredcarinfo?action=CarInfoQuery',
          data: postData
        })
          .then(function (res) {
            let carInfo = res.data.CarInfo;
            if (res.data.ResultCode == 0) {
              that.insData.FrameNo = carInfo.FrameNo;
              that.insData.EngineNo = carInfo.EngineNo;
              that.insData.LicenseNo = carInfo.LicenseNo;
              that.insData.FirstRegisterDate = new Date(carInfo.FirstRegisterDate);
              let $DefaultModelName = carInfo.CarModelList.length == 0 ? '' : carInfo.CarModelList[0].FamilyName + ' ' + carInfo.CarModelList[0].ParentVehName;
              that.insData.DefaultModelName = $DefaultModelName;
              that.insData.DefaultModelCode = carInfo.DefaultModelCode;
              that.quotation();
              Indicator.close();
            } else if (res.data.ResultCode == 1) {
              console.log('ReturnMessage:', res.data.ReturnMessage);
              MessageBox.alert('此车架号未匹配到数据!', '提示');
            } else {
              MessageBox.alert('接口访问失败！', '提示');
            }
            Indicator.close();
          })
          .catch(function (err) {
            Toast({
              message: '接口访问失败！',
              position: 'bottom',
              duration: 2500
            });
            Indicator.close();
            console.log('catch', err);
          });
      }
    }
    // 获取 CitySupplierQuery
    let citySupplierQueryData = {
      PartnerId: this.PartnerId,
      CityCode: this.CityCode
    }
    this.$http({
      method: "POST",
      url: quote.requrl + '/insuredbasedata?action=CitySupplierQuery',
      data: JSON.stringify(citySupplierQueryData)
    })
      .then(function (res) {
        let resData = res.data.data
        console.log('res:', res.data)
        that.SupplierIds = resData[0].SupplierId;
        bus.$emit('transCitySupplierQuery', res.data.data);
      })
      .catch(function (err) {
        Toast({
          message: '接口访问失败！',
          position: 'bottom',
          duration: 2500
        });
        console.log('catch', err);
        console.log('catch', err);
      });
  }

}

</script>
<style scoped>
#detail {
  margin-top: 3rem;
  margin-bottom: 3rem;
  overflow: scroll;
}

.scroll-up {
  margin-top: -10.2rem;
  transition: margin-top 2s;
  -moz-transition: margin-top 2s;
  /* Firefox 4 */
  -webkit-transition: margin-top 2s;
  /* Safari 和 Chrome */
  -o-transition: margin-top 2s;
  /* Opera */
  /*transform:translateY(-10.2rem);
  -ms-transform:translateY(-10.2rem);
  -moz-transform:translateY(-10.2rem);
  -webkit-transform:translateY(-10.2rem);
  -o-transform:translateY(-10.2rem); */
}

.scroll-down {
  margin-top: 5rem;
  transition: margin-top 2s;
  -moz-transition: margin-top 2s;
  /* Firefox 4 */
  -webkit-transition: margin-top 2s;
  /* Safari 和 Chrome */
  -o-transition: margin-top 2s;
  /* Opera */
}

.recognizee-box {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 48px;
  display: block;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  -webkit-box-align: center;
  padding: .5rem 1rem;
  border-radius: 0.5rem;
  border: 0.08rem solid rgb(229, 229, 229);
}

.switch-box {
  display: flex
}

.switch-label {
  flex-grow: 1;
}
</style>
