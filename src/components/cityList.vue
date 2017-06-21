<template>
  <div id="cityList">
    <child></child>
    <div class="page-indexlist-wrapper">
      <mt-index-list>
        <mt-index-section v-for="item in alphabet" :index="item.initial">
          <mt-cell v-for="cell in item.cells" :title="cell.name" @click.native.capture="setCity(cell.name,cell.code)"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script>
import head from './header'
const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];
export default {

  name:'cityList',
  methods: {
    setCity:function(city,code){
       console.log(code);
       console.log(city);
       this.$store.commit('SET_CODE',code);
       localStorage.CityCode = code;
       this.$store.commit('SET_CITY',city);
       localStorage.tbCity = city;
       this.$store.commit('NEW_TITLE','基本信息');
       this.$store.commit('ROUT_PATH','/home');
       this.$store.commit('SET_CITY_ON',false);
       this.$store.commit('SET_PR_ON',false);
    }
  },
  data() {
    return {
      alphabet: []
    };
  },
  components:{
    'child':head
  },
  created(){
    // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
    //   let cells = NAMES.filter(name => name[0] === initial);
    //   this.alphabet.push({
    //     initial,
    //     cells
    //   });
    // });
    // console.log(this.alphabet);
  },
  activated(){
    let cityList,
        cityArr = [],
        vm = this;
        console.log(sessionStorage);
    if(sessionStorage.cityList || sessionStorage.length>0){
      cityList = JSON.parse(sessionStorage.cityList);
      console.log(cityList);
      if(!(vm.alphabet.length>0)){
          cityList.sort(function (a, b) {
              return a.FullPin > b.FullPin ? 1 : -1;
          });
          cityList.forEach(function(item){
            switch(item.Name){
              case '北京市':
              vm.alphabet.push({
                initial:item.Name,
                cells:[{
                  name:item.Name,
                  code:item.Code
                }]
              });
              break;
              case '天津市':
              vm.alphabet.push({
                initial:item.Name,
                cells:[{
                  name:item.Name,
                  code:item.Code
                }]
              });
              break;
              case '重庆市':
              vm.alphabet.push({
                initial:item.Name,
                cells:[{
                  name:item.Name,
                  code:item.Code
                }]
              });
              break;
              case '上海市':
              vm.alphabet.push({
                initial:item.Name,
                cells:[{
                  name:item.Name,
                  code:item.Code
                }]
              });
              break;
              default:
              let cells =[];
              item.CityList.forEach(function(city){
                cells.push({
                  name:city.Name,
                  code:city.Code
                });
              })
              vm.alphabet.push({
                initial:item.Name,
                cells:cells
              });
              cityArr.push(item);
              break;
            }
          })
          console.log(cityArr);
      }
    }
  }

}
</script>
<style>

   @media screen and (max-width:320px){
     ul.mint-indexlist-navlist{
       margin-bottom: 480px;
       transform: scale(0.89,0.89);
     }
   }
    .mint-indexlist-nav{
      right:auto;
      left:0;
      border-right:solid 1px #ddd;
    }
    .mint-indexlist-content{
      margin-right:0!important;
      margin-left:80px;
      text-align: center;
    }
    @component-namespace page {
    @component indexlist {
      @descendent desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
      }

      @descendent wrapper {
        width: 100%;
        border-top: solid 1px #ddd;
      }
    }
  }
</style>
