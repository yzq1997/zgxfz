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
        spot:false
    },
    tab(e) {
        
        // console.log(e.currentTarget.dataset.alphaBeta);
        let ind = e.currentTarget.dataset.alphaBeta
        if (ind == 0) {
            this.setData({
                tabData: '金融',
                page:0,
                dataList:[],
            });
        } else if (ind == 1) {
            this.setData({
                tabData: '手机数码',
                page:0,
                dataList:[],
            });
        } else if (ind == 2) {
            this.setData({
                tabData: '食品饮料',
                page:0,
                dataList:[],
            });
        } else if (ind == 3) {
            this.setData({
                tabData: '母婴玩具',
                page:0,
                dataList:[],
            });
        } else if (ind == 4) {
            this.setData({
                tabData: '住宅',
                page:0,
                dataList:[],
            });
        } else if (ind == 5) {
            this.setData({
                tabData: '旅游',
                page:0,
                dataList:[],
            });
        } else if (ind == 6) {
            this.setData({
                tabData: '日用家电',
                page:0,
                dataList:[],
            });
        } else if (ind == 7) {
            this.setData({
                tabData: '化妆',
                page:0,
                dataList:[],
            });
        } else if (ind == 8) {
            this.setData({
                tabData: '医疗保健',
                page:0,
                dataList:[],
            });
        } else if (ind == 9) {
            this.setData({
                tabData: '餐饮',
                page:0,
                dataList:[],
            });
        } else if (ind == 10) {
            this.setData({
                tabData: '水电气',
                page:0,
                dataList:[],
            });
        } else if (ind == 11) {
            this.setData({
                tabData: '快递物流',
                page:0,
                dataList:[],
            });
        } else if (ind == 12) {
            this.setData({
                tabData: '电商',
                page:0,
                dataList:[],
            });
        } else if (ind == 13) {
            this.setData({
                tabData: '运营商',
                page:0,
                dataList:[],
            });
        } else if (ind == 14) {
            this.setData({
                tabData: '汽车',
                page:0,
                dataList:[],
            });
        } else if (ind == 15) {
            this.setData({
                tabData: '其他',
                page:0,
                dataList:[],
            });
        };
        this.data.tab.map((item, index) => {
            if (index == e.currentTarget.dataset.alphaBeta) {
                // console.log(this.data.tab[index]);
                let arr = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
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
        tt.showTabBar();
        this.setData({
            spot:false
        })
        this.getdata(this.data.page);
    },
    //获取数据
    getdata(i) {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetBGListByIndustry",
            data: {
                IndustryName: this.data.tabData,
                ProviceName: '',
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
                // console.log(JSON.parse(JSON.parse(res.data)));
                // console.log("调用成功", res.data);
                let arr = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                    // console.log(item);
                    item.CA_TS_Date = item.CA_TS_Date.substring(0, 10);
                    item.BG_Images = item.BG_Images.split(";")
                    if(item.BG_Images == ""){
                        item.BG_Images = [];
                    }
                   
                    item.BG_Images.map((t,index)=>{
                        if(t.indexOf('https') == -1){
                            item.BG_Images[index] = 'https://' + t;
                            return t
                        }
                    })
                    return item
                })
                // console.log(arr);
                let c = that.data.dataList.concat(arr)
                that.setData({
                    dataList:c,
                });
            },
            fail(res) { 
                console.log("调用失败", res.errMsg);
            },
        });
    },
    onLoad: function () {
        this.getdata(this.data.page);  //获取数据
    },
    // 监听滚动事件
    onPageScroll: function (e) { 
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

    spotImgT(){
        tt.hideTabBar();
        this.setData({
            spot:true
        })
    },
    spotImgF(){
        tt.showTabBar();
        this.setData({
            spot:false
        })
    },
    //跳转详情页
    toArticle(e) {
        let id = e.currentTarget.dataset.alphaBeta;
        tt.reLaunch({
            url: `../article/index?id=${id}`,
            success(res) {
                // console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        }, 200);
    },

    onShow() {}
})
