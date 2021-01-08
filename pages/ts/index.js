const app = getApp()

Page({
    data: {
        flag: true,
        zzc: false,
        zzct:false,
        num1:1,
        num2:2,
        num3:3
    },
    //单选框
    toList() {
        this.setData({
            flag: !this.data.flag,
        });
    },
    //点击协议
    agreement() {
        this.setData({
            zzc:true
        });
    },
    //点击遮罩层
    zzc(){
        this.setData({
            zzc:false
        });
    },
    //点击同意
    btnt() {
        this.setData({
            flag: true,
            zzc:false
        });
    },
    //点击不同意
    btnf() {
        this.setData({
            flag: false,
            zzc:false
        });
    },
    //点击按钮网上消费
    webcon(){
        if(this.data.flag == false){
            this.setData({
                zzct:true
            });
            return false;
        }

        tt.reLaunch({
            url: `../ts_data/index?sky=${this.data.num1}`,
            success(res) {
                console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },
    //点击按钮店铺消费
    supcon(){
        if(this.data.flag == false){
            this.setData({
                zzct:true
            });
            return false
        };
        tt.reLaunch({
            url: `../ts_data/index?sky=${this.data.num2}`,
            success(res) {
                console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },
    //点击按钮电视购物
    shop(){
        if(this.data.flag == false){
            this.setData({
                zzct:true
            });
            return false
        };
        tt.reLaunch({
            url: `../ts_data/index?sky=${this.data.num3}`,
            success(res) {
                console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },
    //点击确定按钮
    zzct(){
        this.setData({
            zzct:false
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
