const app = getApp()

Page({
    data: {
        tab1: false,
        tab2: false,
        tab3: false,
        index1: 0,
        index2: 0,
        index3: 0,
        index4: 0,
        index5: 0,
        index5_1: 0,
        index6: 0,
        index7: 0,
        array1: ["自营", "第三方", "不明确",],
        array2: ["APP", "网页", "微信",],
        array3: ["电商1", "电商2", "电商3",],
        array4: ["男", "女",],
        array5: ["母婴玩具", "手机数码", "食品饮料", "汽车", "金融", "住宅", "旅游", "日用家电", "化妆", "医疗保健", "餐饮", "水电气", "快递物流", "电商", "其他", "运营商",],
        array5_1: ["母婴玩具", "手机数码", "食品饮料", "汽车", "金融", "住宅", "旅游", "日用家电", "化妆", "医疗保健", "餐饮", "水电气", "快递物流", "电商", "其他", "运营商",],
        array6: ["男", "女",],
        array7: ["母婴玩具", "手机数码", "食品饮料", "汽车", "金融", "住宅", "旅游", "日用家电", "化妆", "医疗保健", "餐饮", "水电气", "快递物流", "电商", "其他", "运营商",],
        multiIndex: ['上海市', '上海市', '崇明县'],
        value: "",
        value1: "",
        value2: "",
        getnum1: '获取验证码',
        getnumT: true,
        getnum2: '获取验证码',
        getnumF: true,
        getnum3: '获取验证码',
        getnumX: true,

        btn1: false, //网上消费投诉诉求选项-1-4
        btn2: false,
        btn3: false,
        btn4: false,
        btn5: false, //实体店消费投诉诉求选项-5-8
        btn6: false,
        btn7: false,
        btn8: false,
        btn9: false, //电视消费投诉诉求选项-9-12
        btn10: false,
        btn11: false,
        btn12: false,
        images: [],
        imageList: '',
        interGMPT: "",  //网上消费购买平台
        interDPMC: "",  //网上消费店铺名称
        interDPXS: "",  //网上消费店铺形式
        interGMQD: "",  //网上消费购买渠道
        interDDHM: "",  //网上消费订单号码
        interLXDH: "",  //网上消费联系电话
        interHYLX: "电商",  //网上消费行业类型
        interPP: "",    //网上消费品牌
        interXH: "",    //网上消费型号
        interSJJE: "",  //网上消费涉及金额
        interTSNR: "",  //网上消费投诉内容
        interXM: "",    //网上消费姓名
        interXB: "",    //网上消费性别
        interSJHM: "",  //网上消费手机号码
        interYZM: "",   //网上消费验证码
        yzmShow1: false,

        storeQYMC: "",  //实体店消费企业名称
        storeQYDZ: "",  //实体店消费企业地址
        storeXXDZ: "",  //实体店消费详细地址
        storeLXDH: "",  //实体店消费联系电话
        storeHYLX: "",  //实体店消费行业类型
        storePP: "",  //实体店消费品牌
        storeXH: "",  //实体店消费型号
        storeSJJE: "",    //实体店消费涉及金额
        storeTSNR: "",    //实体店消费投诉内容
        storeXM: "",  //实体店消费姓名
        storeXB: "",  //实体店消费性别
        storeSJHM: "",    //实体店消费手机号码
        storeYZM: "",    //实体店消费验证码
        yzmShow2: false,

        tvDST: "",  //电视消费电视台
        tvJMMC: "",  //电视消费节目名称
        tvLXDH: "",  //电视消费联系电话
        tvHYLX: "",  //电视消费行业类型
        tvPP: "",  //电视消费品牌
        tvXH: "",  //电视消费型号
        tvSJJE: "",    //电视消费涉及金额
        tvTSNR: "",    //电视消费投诉内容
        tvXM: "",  //电视消费姓名
        tvXB: "",  //电视消费性别
        tvSJHM: "",    //电视消费手机号码
        tvYZM: "",    //电视消费验证码
        yzmShow3: false,
    },
    
    //网上消费-方法
    //店铺形式
    bindPickerChange1(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index1: e.detail.value,
            interDPXS: this.data.array1[e.detail.value]
        });
        console.log(this.data.interDPXS);
    },
    bindPickerCancel1: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    //购买渠道
    bindPickerChange2(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index2: e.detail.value,
        });
    },
    bindPickerCancel2: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    //行业类型
    bindPickerChange5_1(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index5_1: e.detail.value,
        });
    },
    bindPickerCancel5_1: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    //性别
    bindPickerChange4(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index4: e.detail.value,
        });
    },
    bindPickerCancel4: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    onTextFocus: function (e) {  //获取焦点
        // console.log(1);
        // console.log(e);
    },
    onTextBlur: function (e) {  //失去焦点
        // console.log(2);
        // console.log(e.detail.value);

    },
    onTextInput: function (e) {  //内容改变
        // console.log(e);
        this.setData({
            interTSNR: e.detail.value,
        });
        console.log(this.data.interTSNR);
        // console.log(3);
    },
    onTextConfirm: function (e) {  //输入完成
        // console.log(4);
        // tt.showToast({ title: "confirm" });
    },
    ts_btn1() {
        this.setData({
            btn1: !this.data.btn1
        })
    },
    ts_btn2() {
        this.setData({
            btn2: !this.data.btn2
        })
    },
    ts_btn3() {
        this.setData({
            btn3: !this.data.btn3
        })
    },
    ts_btn4() {
        this.setData({
            btn4: !this.data.btn4
        })
    },
    chooseImage(e) {
        tt.chooseImage({
            count: 3,
            success: (res) => {
                tt.showToast({ title: "选择成功" });
                console.log("chooseImage 返回结果：", res);
                this.setData({
                    imageList: res.tempFiles,
                });
            },
            fail(err) {
                let errType = err.errMsg.includes("chooseImage:fail cancel") ? "取消选择" : "选择失败";
                tt.showModal({
                    title: errType,
                    content: err.errMsg,
                    showCancel: false,
                });
            },
            complete(res) {
                console.log("完成选择");
            },
        });
    },
    handleConfirm1(e) {
        console.log(e.detail.value);
        this.setData({
            interGMPT: e.detail.value,
        });
    },
    handleConfirm2(e) {
        console.log(e.detail.value);
        this.setData({
            interDPMC: e.detail.value,
        });
    },
    handleConfirm3(e) {
        console.log(e.detail.value);
        this.setData({
            interDDHM: e.detail.value,
        });
    },
    handleConfirm4(e) {
        console.log(e.detail.value);
        this.setData({
            interLXDH: e.detail.value,
        });
    },
    handleConfirm5(e) {
        console.log(e.detail.value);
        this.setData({
            interPP: e.detail.value,
        });
    },
    handleConfirm6(e) {
        console.log(e.detail.value);
        this.setData({
            interXH: e.detail.value,
        });
    },
    handleConfirm7(e) {
        console.log(e.detail.value);
        this.setData({
            interSJJE: e.detail.value,
        });
    },
    handleConfirm8(e) {
        console.log(e.detail.value);
        this.setData({
            interXM: e.detail.value,
        });
    },
    handleConfirm9(e) {
        // console.log(e);
        console.log(e.detail.value);
        this.setData({
            interSJHM: e.detail.value
        })
    },
    handleConfirm10(e) {
        console.log(e.detail.value);
        this.setData({
            interYZM: e.detail.value
        })
    },
    //获取验证码
    getnum1() {
        let that = this;
        // console.log(that.data.interSJHM,5);
        if (this.data.getnumT) {
            that.setData({
                getnumT: false,
            });
            if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(that.data.interSJHM))) {
                tt.showToast({ title: "请输入正确手机号" });
                that.setData({
                    getnumT: true
                })
                return false;
            } else {
                var time = 60;
                that.setData({
                    getnum1: time + 's',
                });
                let timer = setInterval(function () {
                    time--;
                    that.setData({
                        getnum1: time + 's',
                    });
                    if (time == 0) {
                        clearInterval(timer);
                        that.setData({
                            getnum1: '获取验证码',
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
                    url: "https://webservice.jshcsoft.com/SSMSAPI/SendMsgAPI.ashx",
                    data: {
                        tele: Number(this.data.interSJHM),
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
                            yzmShow1: true
                        })
                    },
                    fail(res) {
                        console.log("调用失败", res.errMsg);
                    },
                });
            }
        }
    },
    //提交投诉
    setTsO(){
        let that = this;
        if(
            (that.data.interGMPT !== '' && 
            that.data.interDPMC !== '' && 
            that.data.interDDHM !== '' && 
            that.data.interLXDH !== '' && 
            that.data.interPP !== '' && 
            that.data.interXH !== '' && 
            that.data.interSJJE !== '' && 
            that.data.interTSNR !== '' && 
            that.data.interXM !== '' && 
            that.data.interSJHM !== '' && 
            that.data.interYZM !== '') &&
            (that.data.btn1 || that.data.btn2 || that.data.btn3 || that.data.btn4)
        ){
            //发送请求，提交评论
        }else{
            tt.showToast({
                title: '请将信息填写完整',
                icon: 'fail',
                duration: 1500
            })
        }
    },


    //实体店消费-方法
    //省市区
    bindMultiPickerChange(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            multiIndex: e.detail.value,
        });
    },
    onTextFocus1: function (e) {
        // console.log(e);
    },
    onTextBlur1: function (e) {
        // console.log(e.detail.value);
    },
    onTextInput1: function (e) {
        this.setData({
            value1: e.detail.value,
        });
        console.log(this.data.value1);
    },
    onTextConfirm1: function (e) {
        // tt.showToast({ title: "confirm" });
    },
    //行业类型
    bindPickerChange5(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index5: e.detail.value,
        });
    },
    bindPickerCancel5: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    //性别
    bindPickerChange6(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index6: e.detail.value,
        });
    },
    bindPickerCancel6: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    ts_btn5() {
        this.setData({
            btn5: !this.data.btn5
        })
    },
    ts_btn6() {
        this.setData({
            btn6: !this.data.btn6
        })
    },
    ts_btn7() {
        this.setData({
            btn7: !this.data.btn7
        })
    },
    ts_btn8() {
        this.setData({
            btn8: !this.data.btn8
        })
    },
    handleConfirm11(e) {
        console.log(e.detail.value);
    },
    handleConfirm12(e) {
        console.log(e.detail.value);
    },
    handleConfirm13(e) {
        console.log(e.detail.value);
    },
    handleConfirm14(e) {
        console.log(e.detail.value);
    },
    handleConfirm15(e) {
        console.log(e.detail.value);
    },
    handleConfirm16(e) {
        console.log(e.detail.value);
    },
    handleConfirm17(e) {
        console.log(e.detail.value);
    },
    handleConfirm18(e) {
        console.log(e.detail.value);
        this.setData({
            storeSJHM: e.detail.value
        })
    },
    handleConfirm19(e) {
        console.log(e.detail.value);
    },
    //获取验证码
    getnum2() {
        let that = this;
        // console.log(that.data.interSJHM,5);
        if (this.data.getnumF) {
            that.setData({
                getnumF: false,
            });
            if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(that.data.storeSJHM))) {
                tt.showToast({ title: "请输入正确手机号" });
                that.setData({
                    getnumF: true
                })
                return false;
            } else {
                var time = 60;
                that.setData({
                    getnum2: time + 's',
                });
                let timer = setInterval(function () {
                    time--;
                    that.setData({
                        getnum2: time + 's',
                    });
                    if (time == 0) {
                        clearInterval(timer);
                        that.setData({
                            getnum2: '获取验证码',
                        });
                        that.setData({
                            getnumF: true,
                        });
                    }
                }, 1000);

                let flag = "";
                for (var i = 0; i < 5; i++) {
                    flag += Math.floor(Math.random() * 10)
                };


                tt.request({
                    url: "https://webservice.jshcsoft.com/SSMSAPI/SendMsgAPI.ashx",
                    data: {
                        tele: Number(this.data.storeSJHM),
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
                            yzmShow2: true
                        })
                    },
                    fail(res) {
                        console.log("调用失败", res.errMsg);
                    },
                });
            }
        }
    },



    //电视购物-方法
    bindPickerChange7(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index7: e.detail.value,
        });
    },
    bindPickerCancel7: function (e) {
        console.log(e);
        tt.showToast({ title: "取消" });
    },
    ts_btn9() {
        this.setData({
            btn9: !this.data.btn9
        })
    },
    ts_btn10() {
        this.setData({
            btn10: !this.data.btn10
        })
    },
    ts_btn11() {
        this.setData({
            btn11: !this.data.btn11
        })
    },
    ts_btn12() {
        this.setData({
            btn12: !this.data.btn12
        })
    },
    onTextFocus2: function (e) {
        // console.log(e);
    },
    onTextBlur2: function (e) {
        // console.log(e.detail.value);
    },
    onTextInput1: function (e) {
        this.setData({
            value3: e.detail.value,
        });
        console.log(this.data.value3);
    },
    onTextConfirm1: function (e) {
        // tt.showToast({ title: "confirm" });
    },
    handleConfirm20(e) {
        console.log(e.detail.value);
    },
    handleConfirm21(e) {
        console.log(e.detail.value);
    },
    handleConfirm22(e) {
        console.log(e.detail.value);
    },
    handleConfirm23(e) {
        console.log(e.detail.value);
    },
    handleConfirm24(e) {
        console.log(e.detail.value);
    },
    handleConfirm25(e) {
        console.log(e.detail.value);
    },
    handleConfirm26(e) {
        console.log(e.detail.value);
    },
    handleConfirm27(e) {
        console.log(e.detail.value);
        this.setData({
            tvSJHM: e.detail.value
        })
    },
    handleConfirm28(e) {
        console.log(e.detail.value);
    },
    //获取验证码
    getnum3() {
        let that = this;
        // console.log(that.data.interSJHM,5);
        if (this.data.getnumX) {
            that.setData({
                getnumX: false,
            });
            if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(that.data.tvSJHM))) {
                tt.showToast({ title: "请输入正确手机号" });
                that.setData({
                    getnumX: true
                })
                return false;
            } else {
                var time = 60;
                that.setData({
                    getnum3: time + 's',
                });
                let timer = setInterval(function () {
                    time--;
                    that.setData({
                        getnum3: time + 's',
                    });
                    if (time == 0) {
                        clearInterval(timer);
                        that.setData({
                            getnum3: '获取验证码',
                        });
                        that.setData({
                            getnumX: true,
                        });
                    }
                }, 1000);

                let flag = "";
                for (var i = 0; i < 5; i++) {
                    flag += Math.floor(Math.random() * 10)
                };


                tt.request({
                    url: "https://webservice.jshcsoft.com/SSMSAPI/SendMsgAPI.ashx",
                    data: {
                        tele: Number(this.data.tvSJHM),
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
                            yzmShow3: true
                        })
                    },
                    fail(res) {
                        console.log("调用失败", res.errMsg);
                    },
                });
            }
        }
    },





    onLoad: function (e) {
        console.log(e);
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetComplaintsAppealDetail",
            header: {
                "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            data: {
                Code: e.id
            },
            success(res) {
                // console.log(res);
                console.log(JSON.parse(JSON.parse(res.data)));
                let obj = JSON.parse(JSON.parse(res.data));
                let ind = that.data.array5_1.indexOf(`${obj.CA_BS_BuinessType}`);
                if(obj.CA_BS_Sellway == '网上消费'){
                    that.setData({
                        tab1: true,
                        tab2: false,
                        tab3: false,
                        interGMPT:obj.CA_TS_EntityName,
                        interDPMC:obj.ShopName,
                        index5_1:ind
                    })
                }else if(obj.CA_BS_Sellway == '店铺消费'){
                    let arr = [obj.CA_ProviceName,obj.CA_CityName,obj.CA_DistrictName];
                    let ind = that.data.array5.indexOf(`${obj.CA_BS_BuinessType}`);
                    that.setData({
                        tab1: false,
                        tab2: true,
                        tab3: false,
                        storeQYMC:obj.CA_TS_EntityName,
                        storeXXDZ:obj.CA_BS_Address,
                        multiIndex:arr,
                        storePP:obj.CA_BS_Brand,
                        storeXH:obj.CA_BS_Model,
                        index5:ind
                    })
                }else{
                    let ind1 = that.data.array7.indexOf(`${obj.CA_BS_BuinessType}`);
                    that.setData({
                        tab1: false,
                        tab2: false,
                        tab3: true,
                        tvDST:obj.CA_TS_EntityName,
                        tvJMMC:obj.CA_BS_Sellway,
                        index7:ind1,
                        tvPP:obj.CA_BS_Brand,
                        tvXH:obj.CA_BS_Model,
                    })
                }
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },
    onShow: function () {
        tt.hideTabBar()
    },
    onHide: function () {
        // console.log(555);
        tt.hideTabBar()
    }
})
