const app = getApp()

Page({
    data: {
        yzm: '发送验证码',
        getnumT: true,
        index: 0,
        qyhad:false,
        array: ["男", "女",],
        qyname: '',  //企业名称
        qyphone: '',  //企业固话
        qyaddress: '',  //企业地址
        qyemail: '',  //企业邮箱
        qyuser: '',  //企业联系人
        userphone: '',  //联系电话
        yzmnum: '',  //验证码
        userflx: '男',  //性别
        yzmShow:false,

    },
    
    //获取验证码
    btn() {
        // var that = this;
        if (this.data.getnumT) {
            let that = this;
            that.setData({
                getnumT: false,
            });
            if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(that.data.userphone))) {
                tt.showToast({ title: "请输入正确手机号" });
                that.setData({
                    userphone: '',
                    getnumT: true
                })
                return false;
            } else {
                var time = 60;
                that.setData({
                    yzm: time + 's',
                });
                let timer = setInterval(function () {
                    time--;
                    that.setData({
                        yzm: time + 's',
                    });
                    if (time == 0) {
                        clearInterval(timer);
                        that.setData({
                            yzm: '获取验证码',
                        });
                        that.setData({
                            getnumT: true,
                        });
                    }
                }, 1000);

                let flag = "";
                for (var i = 0; i < 5; i++) {
                    flag += Math.floor(Math.random() * 10)
                };

               
                tt.request({
                    url: "https://webservice.jshcsoft.com/SSMSAPI/msg_budiot_wisdom315Normal.ashx",
                    data: {
                        tele: Number(this.data.userphone),
                        msg: `验证码为:${flag}请在5分钟内按页面提示提交验证码。`
                    },
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: "POST",
                    dataType: " json", 
                    responseType: "text",
                    success(res) {
                        // console.log(res);
                        that.setData({
                            yzmShow:true
                        })
                    },
                    fail(res) {
                        console.log("调用失败", res.errMsg);
                    },
                });
            }


        }
    },
    //性别
    bindPickerChange(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index: e.detail.value,
        });
        if(e.detail.value == 0){
            this.setData({
                userflx:'男'
            })
        }else{
            this.setData({
                userflx:'女'
            })
        }
    },
    bindPickerCancel: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    handleBlur1(e) {
        // console.log(e.detail.value);
        this.setData({
            qyname: e.detail.value.trim()
        })
        console.log(this.data.qyname);
    },
    handleBlur2(e) {
        // console.log(e.detail.value);
        this.setData({
            qyphone: e.detail.value.trim()
        });
        console.log(this.data.qyphone);
    },
    handleBlur3(e) {
        // console.log(e.detail.value);
        this.setData({
            qyaddress: e.detail.value.trim()
        });
        console.log(this.data.qyaddress);
    },
    handleBlur4(e) {
        // console.log(e.detail.value);
        this.setData({
            qyemail: e.detail.value.trim()
        });
        console.log(this.data.qyemail);
    },
    handleBlur5(e) {
        // console.log(e.detail.value);
        this.setData({
            qyuser: e.detail.value.trim()
        });
        console.log(this.data.qyuser);
    },
    handleBlur6(e) {
        // console.log(e.detail.value);
        this.setData({
            userphone: e.detail.value.trim()
        });
        console.log(this.data.userphone);
    },
    handleBlur7(e) {
        // console.log(e.detail.value);
        this.setData({
            yzmnum: e.detail.value.trim()
        });
        console.log(this.data.yzmnum);
    },

    //提交
    sub() {
        if(!this.data.yzmShow){
            tt.showToast({ title: "验证码有误" });
            return false;
        }
        
        if (this.data.qyname == '' || this.data.userflx == '' || this.data.qyaddress == '' || this.data.qyemail == '' || this.data.qyuser == '' || this.data.userphone == '' || this.data.yzmnum == '') {
            tt.showToast({ title: "请填写完整信息" });
        } else {
            let that = this;
            tt.request({
                url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/AddCompanyApply",
                    data: {
                        CA_CompanyName:this.data.qyname,
                        CA_UserPhone:this.data.userphone,
                        CA_User:this.data.qyuser,
                        CA_Address:this.data.qyaddress,
                        CA_Email:this.data.qyemail,
                        CA_Phone:this.data.qyphone,
                        CA_Sex:this.data.userflx,
                    },
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: "POST",
                    dataType: " json", // 指定返回数据的类型为 string
                    responseType: "text",
                    success(res) {
                        // console.log(res.data);
                        if(res.data.indexOf('false') !== -1){
                            that.setData({
                                qyhad:true
                            });
                        }
                    },
                    fail(res) {
                        console.log("调用失败", res.errMsg);
                    },
            });
        };
        let tha = this;
        setTimeout(function(){
            tha.setData({
                qyhad:false
            });
        },3000)
    },


    onLoad: function () {

    },
})
