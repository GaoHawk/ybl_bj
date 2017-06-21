<template>
    <div class="login">
        <child></child>
        <h2 class="title">优保联车险报价</h2>
        <mt-field label="商户编码" :state="partnerid_state" placeholder="请输入商户编码" v-model="partnerid" v-focus></mt-field>
        <mt-field label="用户名" :state="account_state" placeholder="请输入用户名" v-model="loginname" v-focus></mt-field>
        <mt-field label="密码" :state="pwd_state" placeholder="请输入密码" type="password" v-model="password" v-focus></mt-field>
        <div class="center">
            <mt-button type="primary" size="large" @click.native="logIn">登录</mt-button>
        </div>
    </div>
</template>
<script>
import Bus from '../../common/bus';
import { Indicator } from 'mint-ui';
import { Toast, Button } from 'mint-ui';
import Header from './header.vue'
import quote from '../../common/comm.js'

export default {
    data() {
        let pid = '', pname = '', lgname = '';
        if (sessionStorage.insLogin) {
            let insLogin = JSON.parse(sessionStorage.insLogin);
            pid = insLogin.partnerid;
            pname = insLogin.partnername;
            lgname = insLogin.loginname
        }
        return {
            partnerid: pid,
            partnerName: pname,
            loginname: lgname,
            password: '',
            partnerid_state:'',
            account_state:'',
            pwd_state:'',
        }
    },
    components: {
        'child': Header
    },
    methods: {
        logIn() {
            Indicator.open(`登录中...`);
            var partnerid = this.partnerid, loginname = this.loginname, password = this.password;
            let partnerIdErrMsg = '', userErrMsg = '', pwdErrMsg = '';
            if (partnerid == "" || partnerid <= 0) {
                partnerIdErrMsg = '商户编码错误'
            }
            else if (loginname == "") {
                userErrMsg = '用户名错误'
            }
            else if (password.length < 6) {
                pwdErrMsg = '密码不得小于6位'
            }

            // 前端验证输入合法性
            if (partnerIdErrMsg.length > 0 || userErrMsg.length > 0 || pwdErrMsg.length > 0) {
                var errMsg = '';//userErrMsg?userErrMsg:'' + `_` + pwdErrMsg;
                if (partnerIdErrMsg.length > 0) {
                    this.partnerid_state = 'error';
                    errMsg = partnerIdErrMsg;
                }
                else if (userErrMsg.length > 0) {
                    this.account_state = 'error';
                    errMsg = userErrMsg;
                }
                else if (pwdErrMsg.length > 0) {
                    this.pwd_state = 'error';
                    errMsg = pwdErrMsg;
                }
                if(errMsg.length>0){
                  setTimeout(function(){
                      Indicator.close();
                      Toast({
                          message: errMsg,
                          position: 'bottom',
                          duration: 2500
                      });
                  },1500)
                }


                return;
            }

            let _curl = quote.requrl + "/login?action=login";
            this.$http({
                method: 'post',
                url: _curl,
                data: {
                    PartnerID: partnerid,
                    loginname: loginname,
                    Password: password
                }
            }).then(response => {
                Indicator.close();
                console.log(response.data);
                if (response.data.Msg) {
                    Toast({
                        message: response.data.Msg,
                        position: 'bottom',
                        duration: 2500
                    });
                    return;
                }
                let store = this.$store;
                store.commit('SET_PARTNERID', partnerid);
                window.sessionStorage.insLogin = JSON.stringify({
                    partnerid: partnerid,
                    partnername: response.data.PartnerName,
                    loginname: loginname
                });
                store.commit('ROUT_PATH', '/home');
                Indicator.close();
                console.log(sessionStorage);
            })
                .catch(function (err) {
                    Indicator.close();
                    Toast({
                        message: '接口访问失败！',
                        position: 'bottom',
                        duration: 2500
                    });
                    console.log('catch', err);
                });
        }
    },
    activated() {

    }
}
</script>
<style >
.center {
    margin-top: 10px;
    text-align: center;
}

.login .title {
    text-align: center;
    margin-top: 60px;
}
</style>
