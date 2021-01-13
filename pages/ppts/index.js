const app = getApp()

Page({
    data: {
        tab: [
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ],
        tabData: '金融',  //选中哪一个tab
        page: 0,  //分页
        dataList: [],  //数据
        dataTabId: 0,
        foot: true,
    },
    tab(e) {
        // console.log(e.currentTarget.dataset.alphaBeta);
        let ind = e.currentTarget.dataset.alphaBeta
        if (ind == 0) {
            this.setData({
                tabData: '全部',
                dataTabId: 0,
                page: 0,
                dataList: [],
            });
        } else if (ind == 1) {
            this.setData({
                tabData: '金融',
                page: 0,
                dataList: [],
                dataTabId: 13
            });
        } else if (ind == 2) {
            this.setData({
                tabData: '手机数码',
                page: 0,
                dataList: [],
                dataTabId: 5
            });
        } else if (ind == 3) {
            this.setData({
                tabData: '食品饮料',
                page: 0,
                dataList: [],
                dataTabId: 6
            });
        } else if (ind == 4) {
            this.setData({
                tabData: '母婴玩具',
                page: 0,
                dataList: [],
                dataTabId: 4
            });
        } else if (ind == 5) {
            this.setData({
                tabData: '住宅',
                page: 0,
                dataList: [],
                dataTabId: 14
            });
        } else if (ind == 6) {
            this.setData({
                tabData: '旅游',
                page: 0,
                dataList: [],
                dataTabId: 15
            });
        } else if (ind == 7) {
            this.setData({
                tabData: '日用家电',
                page: 0,
                dataList: [],
                dataTabId: 16
            });
        } else if (ind == 8) {
            this.setData({
                tabData: '化妆',
                page: 0,
                dataList: [],
                dataTabId: 17
            });
        } else if (ind == 9) {
            this.setData({
                tabData: '医疗保健',
                page: 0,
                dataList: [],
                dataTabId: 18
            });
        } else if (ind == 10) {
            this.setData({
                tabData: '餐饮',
                page: 0,
                dataList: [],
                dataTabId: 19
            });
        } else if (ind == 11) {
            this.setData({
                tabData: '水电气',
                page: 0,
                dataList: [],
                dataTabId: 20
            });
        } else if (ind == 12) {
            this.setData({
                tabData: '快递物流',
                page: 0,
                dataList: [],
                dataTabId: 21
            });
        } else if (ind == 13) {
            this.setData({
                tabData: '电商',
                page: 0,
                dataList: [],
                dataTabId: 22
            });
        } else if (ind == 14) {
            this.setData({
                tabData: '运营商',
                page: 0,
                dataList: [],
                dataTabId: 24
            });
        } else if (ind == 15) {
            this.setData({
                tabData: '汽车',
                page: 0,
                dataList: [],
                dataTabId: 12
            });
        } else if (ind == 16) {
            this.setData({
                tabData: '其他',
                page: 0,
                dataList: [],
                dataTabId: 23
            });
        }
        this.data.tab.map((item, index) => {
            if (index == e.currentTarget.dataset.alphaBeta) {
                // console.log(this.data.tab[index]);
                let arr = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
                arr.map((t, i) => {
                    arr[i] = false;
                    if (i == index) {
                        arr[i] = true
                    }
                });
                this.setData({
                    tab: arr
                });

            };
        });
        this.getdata(this.data.page);
    },
    //获取数据
    getdata(i) {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetAllBrandListRanking_New",
            data: {
                IndustryID: this.data.dataTabId,
                // ProviceName: '',
                PageNum: i,
                PageSize: 10
            },
            header: {
                // "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            success(res) {
                // console.log(res);
                // console.log(JSON.parse(JSON.parse(res.data)));
                if (JSON.parse(JSON.parse(res.data)).Rows.length == 0) {
                    that.setData({
                        foot: true,
                    });
                } else {
                    that.setData({
                        foot: false,
                    });
                }
                // console.log("调用成功", res.data);
                let arr = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                    // console.log(item);
                    item.CA_TS_Date = item.CA_TS_Date.substring(0, 10);
                    item.BG_Images = item.BG_Images.split(";")
                    if (item.BG_Images == "") {
                        item.BG_Images = [];
                    }
                    return item
                })
                // console.log(arr);
                let c = that.data.dataList.concat(arr)
                that.setData({
                    dataList: c,
                });
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },
    onLoad: function () {
        this.getdata(this.data.page);  //获取数据
        // tt.getUserInfo({
        //     success(res) {
        //         console.log(`getUserInfo 调用成功 ${res.userInfo}`);
        //     },
        //     fail(res) {
        //         console.log(`getUserInfo 调用失败`);
        //     },
        // })
        tt.login({
            success(res) {
                console.log(`login 调用成功${res.code} ${res.anonymousCode}`);
            },
            fail(res) {
                console.log(`login 调用失败`);
            },
        })
    },
    onPageScroll: function (e) { // 获取滚动条当前位置
        // console.log(e)
        let that = this;
        let listHeight = ''; //当前屏幕的高度 667

        tt.getSystemInfo({
            success: function (res) {
                // console.log(res);
                listHeight = res.windowHeight
            }
        });

        //1866-667 1199  1311
        //1866-619 1247  1311
        let query = tt.createSelectorQuery();
        query.select('#list').boundingClientRect()
        query.exec(function (res) {
            // console.log(res);
            if (e.scrollTop - (res[0].height - listHeight) > 63) {
                that.setData({
                    page: that.data.page + 1
                });
                // console.log(4);
                // console.log(u);
                that.getdata(that.data.page)
            }
        })
    },
})
