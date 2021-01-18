const app = getApp()

Page({
    data: {
        flag:true,
        radio:false,  //单选
        flag1:false,
        flag2:false,
        flag3:false,
        flag4:false,
        flag5:false,
        flag6:false,
    },
    toList(){
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
    chexiao(){
        this.setData({
            radio:true
        })
    },
    rad1() {
        this.setData({
            flag1: !this.data.flag1,
        });
    },
    rad2() {
        this.setData({
            flag2: !this.data.flag2,
        });
    },
    rad3() {
        this.setData({
            flag3: !this.data.flag3,
        });
    },
    rad4() {
        this.setData({
            flag4: !this.data.flag4,
        });
    },
    rad5() {
        this.setData({
            flag5: !this.data.flag5,
        });
    },
    rad6() {
        this.setData({
            flag6: !this.data.flag6,
        });
    },
    //确定投诉
    showT(){
        
    },
    //暂不撤销
    showF(){
        this.setData({
            radio:false
        })
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
