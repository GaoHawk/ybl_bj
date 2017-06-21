import Vue from 'vue'
import Vuex from 'vuex'
import  router  from '../router'

const debug = process.env.NODE_ENV !== 'production'
console.log(router);
Vue.use(Vuex)
Vue.config.debug = debug;

export default new Vuex.Store({

  state: {
    partnerid:10000,
    username:'',
    phone:'',
    carNumber:"",
    prevPath:'',
    path:'',
    title: '基本信息',
    province:'',
    provinceOn:false,
    city:'',
    cityCode:'',
    cityOn:false,
    slotIndex:0,
    FrameNo : '',
    LicenseNo : '',
    Seats:''
  },
  actions: {
    setPartnerId({commit},msg){
      commit('SET_PARTNERID',msg)
    },
    setUsername({commit},msg){
      commit('SET_NAME',msg)
    },
    setPhone({commit},msg){
      commit('SET_PHONE',msg)
    },
    setCarNum({commit},msg){
      commit('SET_CAR_NUM',msg)
    },
    //控制路由状态
    setRouter({commit},path){
       commit('ROUT_PATH',path)
    },
    setNewTitle ({commit}, msg) {
      commit('NEW_TITLE', msg)
    },
    setProvince({commit},msg){
      commit('SET_PROVINCE',msg)
    },
    setCity({commit},msg){
      commit(('SET_CITY'),msg)
    },
    setCode({commit},msg){
      commit('SET_CODE',msg)
    },
    setProvinceOn({coommit},bl){
      commit('SET_PR_ON',bl)
    },
    setCityOn({commit},bl){
      commit('SET_CITY_ON',bl);
    },
    setSlotIndex({commit},num){
      commit('SET_SLOTINDEX',num);
    },
    setFrameNo({commit},num){
      commit('SET_FRAMEnO',num);
    },
    setLicenseNo({commit},num){
      commit('SET_LICENSENO',num);
    },
    setSeats({commit},msg){
      commit('SET_SEATS',msg)
    },
  },
  mutations: {
    SET_PARTNERID(state,msg){
       state.PartnerId = msg;
    },
    SET_NAME(state,msg){
       state.username = msg;
    },
    SET_PHONE(state,msg){
       state.phone = msg
    },
    SET_CAR_NUM(state,msg){
      state.carNumber = msg
    },
    ROUT_PATH(state,path){
       router.push({path:path })
       state.path = path;
    },
    NEW_TITLE (state, msg) {
      state.title = msg
    },
    SET_PROVINCE(state,msg){
      state.province = msg
    },
    SET_CODE(state,msg){
      state.cityCode = msg
    },
    SET_CITY(state,msg){
      state.city = msg;
    },
    SET_PR_ON(state,bl){
      state.provinceOn = bl
    },
    SET_CITY_ON(state,bl){
      state.cityOn = bl
    },
    SET_SLOTINDEX(state,num){
      state.slotIndex = num;
    },
    SET_FRAMENO(state,num){
      state.FrameNo = num;
    },
    SET_LICENSENO(state,num){
      state.LicenseNo = num;
    },
    SET_SEATS(state,num){
      state.Seats = num;
    }
  },

  strict: debug

})
