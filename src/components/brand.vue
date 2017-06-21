<template>
  <div id="brand" class="page-search">
    <v-header></v-header>
    <div class="search-box">
      <input v-model="searchVal" class="search-inp" placeholder="请选择车型">
      <button @click="searchSubmit(searchVal)" class="search-btn">搜索</button>
    </div>
    <div class="list-box" ref="listBox" :style="{height: listBoxHeight + 'px'}">
      <!--<ul id="listBox" class="list-ul">
                              <li class="list-li" v-for="item in list" @click="pitchOn({'FamilyName':item.FamilyName,'ParentVehName':item.ParentVehName})">{{item.BrandName}} {{item.ExhaustCapability}}
                                {{item.ParentVehName}} {{item.Seats+'座'}} {{'市场参考价:'+item.CarPrice+'元'}}
                              </li>
                            </ul>-->
      <ul id="listUl" class="list-ul" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="180">
        <li class="list-li" @click="pitchOn({'FamilyName':item.FamilyName,'ParentVehName':item.ParentVehName,'Seats':item.Seats})" v-for="item in list">{{item.BrandName}} {{item.ExhaustCapability}} {{item.ParentVehName}} {{item.Seats+'座'}} {{'市场参考价:'+item.CarPrice+'元'}}</li>
      </ul>
      <!--<p v-show="true" class="page-infinite-loading brand-loading-p">-->
      <div v-show="loading" class="load-box-center">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span class="brand-loading-text">&nbsp;&nbsp;加载中...</span>
      </div>
      <!--</p>-->
      <p v-if="noneMoreAlert" class="page-infinite-loading brand-loading-p">已加载完毕</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Header from './header'
import quote from '../../common/comm.js'
import { mapState } from 'vuex'
import bus from '../../common/bus.js'
import { InfiniteScroll, Toast, Indicator } from 'mint-ui'


export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      searchVal: '',
      list: [],
      loading: false,
      noneMoreAlert: false,
      allLoaded: false,
      wrapperHeight: 0,
      SkipCount: 0,
      SkipCountOld: true,
      listBoxHeight: 500,
      noneMore: false,
      oldTop: 0
    }
  },
  computed: {
    ...mapState({
      LicenseNo: state => state.LicenseNo,
      FrameNo: state => state.FrameNo
    })
  },
  methods: {
    boxScroll() {
      this.scroll = document.getElementById('listBox').scrollTop;
      console.log(this.scroll)
    },
    searchSubmit(sv) {
      let that = this,
        searchVal = sv.trim();
      if (!searchVal) {
        console.log('true:', searchVal);
        Toast({
          message: '请输入车型',
          position: 'middle',
          duration: 2500
        });
        return
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let postData = {
        BrandName: this.searchVal,
        partnerid: 10000,
        Paging: { SkipCount: this.SkipCount + 1, TakeCount: 20 }
      }
      this.$http({
        method: "POST",
        url: quote.requrl + "/insuredcarinfo?action=AutoModelMatch",
        data: postData
      }).then(function (res) {
        setTimeout(() => {
          Indicator.close();
        }, 200)
        console.log('search:', res.data)
        that.list = res.data.data;
        that.SkipCount += 1;
      }).catch(function (res) {
        Indicator.close();
      })
    },
    pitchOn(obj) {
      console.log('pitchOn:', obj);
      bus.$emit('transCarModelName', obj)
      this.$store.commit('SET_SEATS', obj.Seats);
      this.$store.commit('NEW_TITLE', '车辆信息');
      this.$store.commit('ROUT_PATH', '/carInfo');
    },
    loadMore() {
      this.loading = true;
      let that = this,
        $searchVal = this.searchVal.trim(),
        moreData = {},
        SkipCountOld = this.SkipCountOld,
        SkipCount = this.SkipCount;
      console.log('li this is offset:', SkipCountOld, SkipCount);
      if (SkipCountOld) {
        that.SkipCountOld = false;
        if (!that.noneMore) {
          setTimeout(() => {
            if ($searchVal) {
              moreData = {
                BrandName: this.searchVal.trim(),
                partnerid: 10000,
                Paging: { SkipCount: this.SkipCount * 20 + 1, TakeCount: 20 }
              }
            } else {
              moreData = {
                LicenseNo: this.LicenseNo,
                FrameNo: this.FrameNo,
                partnerid: 10000,
                Paging: { SkipCount: this.SkipCount * 20 + 1, TakeCount: 20 }
              }
            }
            console.log("moreData:", moreData)

            this.$http({
              method: "POST",
              url: quote.requrl + "/insuredcarinfo?action=AutoModelMatch",
              data: moreData
            }).then(function (res) {
              console.log('AutoModelMatch-res:', res.data.data);
              res.data.data.forEach((value) => {
                that.list.push(value);
                that.oldTop = newTop;
              })
              that.SkipCount += 1;
              that.SkipCountOld = true;
              if (res.data.data.length < 20) {
                that.noneMore = true;
                console.log(' that.noneMore', that.noneMore)
              }
            }).catch(function (res) {
              Toast({
                message: '接口访问失败！',
                position: 'bottom',
                duration: 2500
              });
              console.log('catch', err);
            })
            console.log('$setTimeout:', that.SkipCount, that.loading)
            that.loading = false;
          }, 2500)
          console.log("settimeoutoutoutout")
        } else {
          that.loading = false;
          that.noneMoreAlert = true;
          console.log('that.noneMore:', that.noneMore)
        }
      } else {
        console.log('SkipCountOld:', this.SkipCountOld);
        if (that.noneMoreAlert) {
          that.loading = false;
        }
      }
    }
  },
  activated() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    let that = this;
    console.log('车牌号，车架号：', this)
    if (this.LicenseNo == '' && this.FrameNo == '') {
      setTimeout(() => {
        Indicator.close();
      }, 200)
    } else {
      let postData = {
        LicenseNo: this.LicenseNo,
        FrameNo: this.FrameNo,
        partnerid: 10000,
        Paging: { SkipCount: this.SkipCount + 1, TakeCount: 20 }
      }

      this.$http({
        method: "POST",
        url: quote.requrl + "/insuredcarinfo?action=AutoModelMatch",
        data: postData
      }).then(function (res) {
        console.log('then-res:', res);
        that.list = res.data.data;
        that.SkipCount += 1;
        Indicator.close();
      }).catch(function (res) {
        Toast({
          message: '接口访问失败！',
          position: 'bottom',
          duration: 2500
        });
        console.log('catch', err);
      })
    }
  },
  mounted() {
    let $r = window.getComputedStyle(document.documentElement)["fontSize"];
    this.listBoxHeight = document.documentElement.clientHeight - 8 * ($r.substring(0, 2));
    console.log('###listBoxHeight:', this.listBoxHeight)
  }
}
</script>
<style>
.page-search {}

.search-box {
  position: fixed;
  top: 3.5rem;
  width: 100%;
  display: flex;
  padding: .5rem;
  height: 3rem;
}

.search-inp {
  width: calc(100% - 4rem);
  border: 0;
  border-radius: 5px 0 0 5px;
  text-indent: .6rem;
}

.search-btn {
  width: 3rem;
  border: 0;
  border-radius: 0 5px 5px 0;
  background-color: #0aa;
  color: #fff;
}

.list-box {
  box-sizing: border-box;
  margin-top: 7rem;
  background-color: #fff;
  overflow: scroll;
}

.list-box .list-ul {
  display: block;
  margin: 0;
  overflow-y: visible;
}

.list-box .list-li {
  line-height: 1.2rem;
  white-space: 1px;
  padding: .5rem 0;
  border-bottom: 1px dashed #7CDBF1;
  font-size: 15px;
}

.brand-loading-p {
  vertical-align: middle;
  text-align: center;
}

.page-infinite-loading>span {
  display: inline-block
}

.load-box-center {
  margin: .6rem auto;
  width: 100px;
}

.load-box-center>span {
  float: left;
}

.brand-loading-text {
  display: block;
  float: left;
  height: 28px;
  line-height: 28px;
}

@component-namespace page {
  @component infinite {
    @descendent desc {
      text-align: center;
      color: #666;
      padding-bottom: 5px;
      border-bottom: solid 1px #eee;
    }

    @descendent listitem {
      height: 50px;
      line-height: 50px;
      border-bottom: solid 1px #eee;
      text-align: center;
      &:first-child {
        border-top: solid 1px #eee;
      }
    }

    @descendent wrapper {
      margin-top: -1px;
      overflow: scroll;
    }

    @descendent loading {
      text-align: center;
      height: 50px;
      line-height: 50px;

      div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
}











/*.mint-searchbar{
    position: fixed;
    width: 100%;
    margin-left: -8px;
    top: calc(3.5rem - 8px);
  }
  .mint-search-list{
    margin-top: calc(3.5rem - 8px);
  }*/
</style>
