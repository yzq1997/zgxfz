const app = getApp()

Page({
    data: {
        fqheight: 0,
        tgheight: 0,
        csheight: 0,
        detailData: "",
        supperList: "",
        tsData: "",
        tsTotalCount: 0
    },
    onLoad: function (e) {
        // console.log(e);
        this.GetDetail();
        this.GetSupportStaffList();
        this.GetComplaintsProcessList();
    },

    GetDetail: function () {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetBGAppealSheetsRevealedDetail",
            header: {
                "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            data: {
                Code: 'TS266628290171'
            },
            success(res) {
                // console.log(JSON.parse(JSON.parse(res.data)))
                if (res.statusCode == 200) {
                    that.setData({
                        detailData: JSON.parse(JSON.parse(res.data))
                    })
                } else {
                    tt.showToast({
                        title: '请求失败',
                        icon: 'fail',
                        duration: 1500
                    })
                }
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },

    GetSupportStaffList: function () {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetSupportStaffList",
            header: {
                "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            data: {
                BG_Code: 'TS631655424617'
            },
            success(res) {

                if (res.statusCode == 200) {
                    that.setData({
                        supperList: JSON.parse(JSON.parse(res.data))
                    })
                } else {
                    tt.showToast({
                        title: '请求失败',
                        icon: 'fail',
                        duration: 1500
                    })
                }
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },

    GetComplaintsProcessList: function () {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetComplaintsProcessList",
            header: {
                "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            data: {
                Code: 'TS631655424617'
            },
            success(res) {
                if (res.statusCode == 200) {
                    let DataList = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                        if (item.Photos != '') {
                            item.Photos = item.Photos.split(';');
                        }
                        if (item.Photos.length > 0) {
                            let newitem = [];
                            item.Photos.map((item) => {
                                if (item.indexOf('https') < 0) {
                                    item = 'https://' + item;
                                    newitem.push(item);
                                }
                                return item;
                            })
                            item.Photos = newitem;
                        }
                        return item;
                    })
                    // console.log(DataList)
                    that.setData({
                        tsData: DataList,
                        tsTotalCount: JSON.parse(JSON.parse(res.data)).TotalCount
                    })
                } else {
                    tt.showToast({
                        title: '请求失败',
                        icon: 'fail',
                        duration: 1500
                    })
                }
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },


    onReady: function () {
        var that = this;
        const query = tt.createSelectorQuery();
        console.log(that.data.tsTotalCount);
        if (that.data.tsTotalCount == 3) {
            query.select('#fq').boundingClientRect();
            query.select('#tg').boundingClientRect();
            query.select('#cs').boundingClientRect()
            query.exec(function (res) {
                //res就是 所有标签为myText的元素的信息 的数组
                that.setData({
                    fqheight: res[0].height + 28,
                    tgheight: res[1].height + 28,
                })
            })
        } else if (that.data.tsTotalCount == 2) {
            query.select('#fq').boundingClientRect();
            query.select('#tg').boundingClientRect();
            // query.select('#cs').boundingClientRect()
            query.exec(function (res) {
                //res就是 所有标签为myText的元素的信息 的数组
                that.setData({
                    fqheight: res[0].height + 28,
                    // tgheight:res[1].height+28,
                })
            })
        }

    }
})
