<template>
<div id="picker">
  <mt-picker :slots="slots" @change="onValuesChange" value="甘"></mt-picker>
  <p class="page-picker-desc">你选择的省份:{{ province }}</p>
  <mt-button size="small" type="primary" style="float:right;margin-right:10px;"
    @click="closePanel()"
  >确定</mt-button>
</div>
</template>
<script>
import quote from '../../common/comm.js'
import { mapState } from 'vuex'
export default {
  computed:{
     ...mapState({
          provinceOn:state => state.provinceOn,
     })
  },
  methods: {
    onValuesChange(picker,values){
      // if(values[0] > values[1]){
      //   picker.setSlotValue(1,values[0]);
      // }
      if(!(this.provinceOn)) return;
      console.log(values);
      this.province = values[0];
      this.$store.commit('SET_PROVINCE',values[0]);
    },
    closePanel:function(){
      this.$store.commit('SET_PR_ON',false);
    }
  },
  data(){
    return {
      province:'',
      slots:[
        {
          flex: 1,
          values: '',
          className: 'slot1',
        }
      ]
    }
  }
}
</script>
<style>
.page-picker-desc{
  margin:10px 0 50px;
  display: inline-block;
}
</style>
