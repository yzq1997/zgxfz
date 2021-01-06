const app = getApp()

Page({
    data: {
        num: '数据',
        tab: true,
    },
    tab1: function () {
        this.setData({
            tab: true,
        })
        // const query = tt.createSelectorQuery();
        // query.select(".tabO").boundingClientRect();

        // query.exec(function (res) {
        //     // 打印示例按钮的宽度和高度
        //     console.log(res);

        // });
        // console.log(query.select('.tabO'));
    },
    tab2: function () {
        this.setData({
            tab: false,
        });
        // tt.reLaunch({
        //     url: `../detail/index?sky=${this.data.num}`,
        //     success(res) {
        //         console.log(res);
        //     },
        //     fail(res) {
        //         console.log(`reLaunch调用失败`);
        //     }
        // });
    },

    onLoad: function () {

    },
    onShow: function () {

    },
})
