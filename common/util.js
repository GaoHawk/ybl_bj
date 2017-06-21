var util = function (){
    this.api = '192.168.1.1',
this.$insCoverage = {
        "10001": "车损险",
        "10002": "三者责任险",
        "10003": "盗抢险",
        "10004": "司机责任险",
        "10005": "乘客责任险",
        "10501": "交强险",
        "20200": "不计免陪",
        "20201": "玻璃险 (国产玻璃) ",
        "20202": "划痕险",
        "20203": "自燃险",
        "20204": "涉水险",
        "20205": "指定修理厂险",
        "20206": "车上货物责任险",
        "20208": "精神损害险",
        "20209": "修理补偿险",
        "20210": "无法找到第三方特约险",
        "20251": "无法找到第三方特种车险",
        "20252": "起重、装载、挖掘车损失扩展条款",
        "20253": "特种车固定设备、仪器损坏扩展条款",
        "30001": "车损不计免赔",
        "30002": "三者不计免赔",
        "30003": "盗抢不计免赔",
        "30004": "司机不计免赔",
        "30005": "乘客不计免赔",
        "30202": "划痕不计免赔",
        "30203": "自燃不计免赔",
        "30204": "发动机涉水不计免赔",
        "30206": "新加设备不计免赔",
        "30207": "货物不计免赔",
        "30208": "精神损害险不计免赔",
        "30301": "不计免赔率险"
    }
  }
  util.prototype = {
    checkMobil: function (mobile) {
          var result = true,
            myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
          if (!myreg.test(mobile)) {
              result = false
          }
          return result
      },
      IdentityCodeValid: function (code) {
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var tip = "";
        var pass = true;

        if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        return pass;
    },
    getLcStorage: function () {
        var that = this;
        var info = localStorage.getItem(that.strkey);
        if (info) {
            return JSON.parse(info);
        }
        return that.infoData;
    },
    setLcStorage: function (data) {
        localStorage.setItem(this.strkey, data);
    }

  }

export default new util();

