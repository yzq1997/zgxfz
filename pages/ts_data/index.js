const app = getApp()

Page({
    data: {
        tab1: true,
        tab2: false,
        tab3: false,
        index1: 0,
        index2: 0,
        index3: 0,
        index4: 0,
        array1: ["自营", "第三方", "不明确",],
        array2: ["APP", "网页", "微信",],
        array3: ["电商1", "电商2", "电商3",],
        array4: ["男", "女",],
        value: "",
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: true,
        images: [],
        imageList:''
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
    //店铺形式
    bindPickerChange1(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index1: e.detail.value,
        });
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
    onTextFocus: function (e) {
        console.log(e);
    },
    onTextBlur: function (e) {
        console.log(e);
    },
    onTextInput: function (e) {
        this.setData({
            value: e.detail.value,
        });
    },
    onTextConfirm: function (e) {
        tt.showToast({ title: "confirm" });
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







    onLoad: function () {

    },
    onShow: function () {
        tt.hideTabBar()
    },
    onHide: function () {
        // console.log(555);
        tt.hideTabBar()
    }
})
