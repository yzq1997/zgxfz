const app = getApp()

Page({
    data: {
        num:11
    },
    toList() {
        tt.reLaunch({
            url: `../qtts_list/index?sky=${this.data.num}`,
            success(res) {
                console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },
    onLoad: function () {
        console.log('Welcome to Mini Code')
    },
})
