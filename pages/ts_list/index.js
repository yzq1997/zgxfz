const app = getApp()

Page({
    data: {
        flag: true,
        radio: false,  //单选
        flag1: false,
        flag2: false,
        flag3: false,
        flag4: false,
        flag5: false,
        flag6: false,
        textarea: '',
        arr: [],
        code:'',
        radioText:'',
    },
    toList() {
        tt.reLaunch({
            url: `../ts/index`,
            success(res) {
                // console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },
    //点击撤销投诉
    chexiao(e) {
        let ind = e.currentTarget.dataset.alphaBeta
        this.setData({
            radio: true,
            code:ind
        })
    },
    rad1() {
        this.setData({
            flag1: !this.data.flag1,
            flag2: false,
            flag3: false,
            flag4: false,
            flag5: false,
            flag6: false,
            radioText:'双方协商和解'
        });
    },
    rad2() {
        this.setData({
            flag2: !this.data.flag2,
            flag1: false,
            flag3: false,
            flag4: false,
            flag5: false,
            flag6: false,
            radioText:'填写内容失败'
        });
    },
    rad3() {
        this.setData({
            flag3: !this.data.flag3,
            flag2: false,
            flag1: false,
            flag4: false,
            flag5: false,
            flag6: false,
            radioText:'其他渠道投诉'
        });
    },
    rad4() {
        this.setData({
            flag4: !this.data.flag4,
            flag2: false,
            flag3: false,
            flag1: false,
            flag5: false,
            flag6: false,
            radioText:'我不想投诉了'
        });
    },
    rad5() {
        this.setData({
            flag5: !this.data.flag5,
            flag2: false,
            flag3: false,
            flag4: false,
            flag1: false,
            flag6: false,
            radioText:'双方未达成一致，准备起诉'
        });
    },
    rad6() {
        this.setData({
            flag6: !this.data.flag6,
            flag2: false,
            flag3: false,
            flag4: false,
            flag5: false,
            flag1: false,
        });
    },

    onTextInput(e) {
        // console.log(e.detail.value);
        this.setData({
            textarea: e.detail.value
        });
        console.log(this.data.textarea);
    },

    //确定投诉撤销
    showT() {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/UserRevoke",
            data: {
                OpenId: tt.getStorageSync('openid'),
                BG_Code: that.data.code,
                Reason: that.data.radioText,
                Remark: that.data.textarea,
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            dataType: " json",
            responseType: "text",
            success(res) {
                // console.log(JSON.parse(JSON.parse(res.data)));
                tt.showToast({ title: "撤销成功" });
                that.setData({
                    radio:false
                });
                that.getData();
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },
    //暂不撤销
    showF() {
        this.setData({
            radio: false
        })
    },
    //获取数据
    getData(){
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetMyCAList",
            data: {
                OpenId: tt.getStorageSync('openid'),
                // OpenId: 'oxmqXsxKHFgEgDMw6JfRX_iu6l5c',
                PageNum: 0,
                PageSize: 100
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            dataType: " json",
            responseType: "text",
            success(res) {
                console.log(JSON.parse(JSON.parse(res.data)));
                that.setData({
                    arr: JSON.parse(JSON.parse(res.data)).Rows
                });
                JSON.parse(JSON.parse(res.data)).Rows.map(item => {
                    if (item.IS_UserRevoke == 0) {
                        
                    }
                })
                if (JSON.parse(JSON.parse(res.data)).TotalCount == 0) {
                    // tt.reLaunch({
                    //     url: `../ts/index`,
                    //     success(res) {
                    //         // console.log(res);
                    //     },
                    //     fail(res) {
                    //         console.log(`reLaunch调用失败`);
                    //     }
                    // });
                } else {

                }
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },
    onLoad: function () {
        this.getData()
    },
    onShow: function () {
        tt.hideTabBar()
    },
    onHide: function () {
        // console.log(555);
        tt.hideTabBar()
    }
})
