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
        index6: 0,
        index7: 0,
        array1: ["自营", "第三方", "不明确",],
        array2: ["APP", "网页", "微信",],
        array3: ["电商1", "电商2", "电商3",],
        array4: ["男", "女",],
        array5: ["母婴玩具", "手机数码","食品饮料","汽车","金融","住宅","旅游","日用家电","化妆","医疗保健","餐饮","水电气","快递物流","电商","其他","运营商",],
        array6: ["男", "女",],
        array7: ["母婴玩具", "手机数码","食品饮料","汽车","金融","住宅","旅游","日用家电","化妆","医疗保健","餐饮","水电气","快递物流","电商","其他","运营商",],
        multiIndex: ['上海市', '上海市', '崇明县'],
        value: "",
        value1: "",
        value2: "",
        btn1: false, //网上消费投诉诉求选项-1-4
        btn2: false,
        btn3: false, 
        btn4: true,
        btn5: true, //实体店消费投诉诉求选项-5-8
        btn6: true,
        btn7: false,
        btn8: true,
        btn9: true, //电视消费投诉诉求选项-9-12
        btn10: true,
        btn11: false,
        btn12: true,
        images: [],
        imageList: '',
        interGMPT:"",  //网上消费购买平台
        interDPMC:"",  //网上消费店铺名称
        interDPXS:"",  //网上消费店铺形式
        interGMQD:"",  //网上消费购买渠道
        interDDHM:"",  //网上消费订单号码
        interLXDH:"",  //网上消费联系电话
        interHYLX:"",  //网上消费行业类型
        interPP:"",    //网上消费品牌
        interXH:"",    //网上消费型号
        interSJJE:"",  //网上消费涉及金额
        interTSNR:"",  //网上消费投诉内容
        interXM:"",    //网上消费姓名
        interXB:"",    //网上消费性别
        interSJHM:"",  //网上消费手机号码
        interYZM:"",   //网上消费验证码
        
        storeQYMC:"",  //实体店消费企业名称
        storeQYDZ:"",  //实体店消费企业地址
        storeXXDZ:"",  //实体店消费详细地址
        storeLXDH:"",  //实体店消费联系电话
        storeHYLX:"",  //实体店消费行业类型
        storePP:"",  //实体店消费品牌
        storeXH:"",  //实体店消费型号
        storeSJJE:"",    //实体店消费涉及金额
        storeTSNR:"",    //实体店消费投诉内容
        storeXM:"",  //实体店消费姓名
        storeXB:"",  //实体店消费性别
        storeSJHM:"",    //实体店消费手机号码
        storeYZM:"",    //实体店消费验证码


    },
    //点击网上消费
    tab1() {
        this.setData({
            tab1: true,
            tab2: false,
            tab3: false,
        });
    },
    //点击实体店消费
    tab2() {
        this.setData({
            tab1: false,
            tab2: true,
            tab3: false,
        });
    },
    //点击电视购物
    tab3() {
        this.setData({
            tab1: false,
            tab2: false,
            tab3: true,
        });
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
    // bindPickerChange3(e) {
    //     console.log("picker发送选择改变，携带值为", e.detail.value);
    //     this.setData({
    //         index3: e.detail.value,
    //     });
    // },
    // bindPickerCancel3: function (e) {
    //     console.log(e);
    //     tt.showToast({ title: "取消" });
    // },
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
        this.setData({
            value: e.detail.value,
        });
        console.log(this.data.value);
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
    handleBlur1(e){
        console.log(e.detail.value);
    },
    handleBlur2(e){
        console.log(e.detail.value);
    },
    handleBlur3(e){
        console.log(e.detail.value);
    },
    handleBlur4(e){
        console.log(e.detail.value);
    },
    handleBlur5(e){
        console.log(e.detail.value);
    },
    handleBlur6(e){
        console.log(e.detail.value);
    },
    handleBlur7(e){
        console.log(e.detail.value);
    },
    handleBlur8(e){
        console.log(e.detail.value);
    },
    handleBlur9(e){
        console.log(e.detail.value);
    },
    handleBlur10(e){
        console.log(e.detail.value);
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
    handleBlur11(e){
        console.log(e.detail.value);
    },
    handleBlur12(e){
        console.log(e.detail.value);
    },
    handleBlur13(e){
        console.log(e.detail.value);
    },
    handleBlur14(e){
        console.log(e.detail.value);
    },
    handleBlur15(e){
        console.log(e.detail.value);
    },
    handleBlur16(e){
        console.log(e.detail.value);
    },
    handleBlur17(e){
        console.log(e.detail.value);
    },
    handleBlur18(e){
        console.log(e.detail.value);
    },
    handleBlur19(e){
        console.log(e.detail.value);
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
    handleBlur20(e){
        console.log(e.detail.value);
    },
    handleBlur21(e){
        console.log(e.detail.value);
    },
    handleBlur22(e){
        console.log(e.detail.value);
    },
    handleBlur23(e){
        console.log(e.detail.value);
    },
    handleBlur24(e){
        console.log(e.detail.value);
    },
    handleBlur25(e){
        console.log(e.detail.value);
    },
    handleBlur26(e){
        console.log(e.detail.value);
    },
    handleBlur27(e){
        console.log(e.detail.value);
    },
    handleBlur28(e){
        console.log(e.detail.value);
    },
   




    onLoad: function (e) {
        if(e.sky == '1'){
            this.setData({
                tab1: true,
                tab2:false,
                tab3:false,
            })
        }else if(e.sky == '2'){
            this.setData({
                tab1:false,
                tab2:true,
                tab3:false,
            })
        }else{
            this.setData({
                tab1:false,
                tab2:false,
                tab3:true,
            })
        }
    },
    onShow: function () {
        tt.hideTabBar()
    },
    onHide: function () {
        // console.log(555);
        tt.hideTabBar()
    }
})
