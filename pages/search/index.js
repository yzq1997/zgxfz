const app = getApp()

Page({
    data: {
        dataList: [],  //数据
        page: 0,  //分
        type: 1,  //哪一个tab
        inputValue: '',  //输入框内容
        tab: [
            true,
            false,
            false,
        ],
        foot:false,  //底部
    },

    //返回首页
    goHome() {
        tt.reLaunch({
            url: `../index/index`,
            success(res) {
                // console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },

    //输入框完成事件
    handleConfirm(e) {
        // console.log(e.detail.value);
        this.setData({
            inputValue: e.detail.value,
            foot:true
        });
        this.getdata(0);
    },

    //点击tab标签
    tab(e) {
        // console.log(e.currentTarget.dataset.alphaBeta);
        let ind = e.currentTarget.dataset.alphaBeta
        if (ind == 0) {
            this.setData({
                tabData: '投诉单',
                page: 0,
                dataList: [],
                type: 1
            });
        } else if (ind == 1) {
            this.setData({
                tabData: '群体投诉',
                page: 0,
                dataList: [],
                type: 2
            });
        } else if (ind == 2) {
            this.setData({
                tabData: '品牌',
                page: 0,
                dataList: [],
                type: 3
            });
        }
        this.data.tab.map((item, index) => {
            if (index == e.currentTarget.dataset.alphaBeta) {
                // console.log(this.data.tab[index]);
                let arr = [false, false, false]
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

    //点击跳转列表页
    toList(e) {
        // console.log(e);
        let id = e.currentTarget.dataset.alphaBeta;
        let newid = e.currentTarget.dataset.alphaBeta1;
        // console.log(id);
        tt.reLaunch({
            url: `../qtts_list/index?id=${id}&newid=${newid}`,
            success(res) {
                // console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
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

    //获取数据
    getdata(i) {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/Search",
            data: {
                KeyWord: that.data.inputValue,
                PageNum: i,
                PageSize: 10,
                Type: that.data.type
            },
            header: {
                // "content-type": "application/json",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            success(res) {
                // console.log(JSON.parse(JSON.parse(res.data)));
                let arr = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                    // console.log(item);
                    if (item.CA_TS_Date) {
                        item.CA_TS_Date = item.CA_TS_Date.substring(0, 10);
                    };
                    if (item.Joindate) {
                        item.Joindate = item.Joindate.substring(0, 10);
                    }

                    if (item.BG_Images) {
                        item.BG_Images = item.BG_Images.split(";")
                        if (item.BG_Images == "") {
                            item.BG_Images = [];
                        }

                        item.BG_Images.map((t, index) => {
                            if(t.indexOf('http') == -1){
                                if(t.indexOf(':443') == -1){
                                    item.BG_Images[index] = 'http://' + t;
                                }else{
                                    item.BG_Images[index] = 'https://' + t;
                                }
                                
                                return t
                            }
                        });
                    }

                    if(item.IE_ImgUrl){
                        item.IE_ImgUrl = item.IE_ImgUrl.split(";")
                        if (item.IE_ImgUrl == "") {
                            item.IE_ImgUrl = [];
                        }

                        item.IE_ImgUrl.map((t, index) => {
                            if(t.indexOf('http') == -1){
                                if(t.indexOf(':443') == -1){
                                    item.IE_ImgUrl[index] = 'http://' + t;
                                }else{
                                    item.IE_ImgUrl[index] = 'https://' + t;
                                }
                                
                                return t
                            }
                        });
                    }


                    return item
                })
                console.log(arr);
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

    // 监听滚动事件
    onPageScroll: function (e) {
        console.log(e)
        let that = this;
        let listHeight = ''; //当前屏幕的高度 667

        tt.getSystemInfo({
            success: function (res) {
                // console.log(res);
                listHeight = res.windowHeight
            }
        });
        //1430   2100-667  1436
        let query = tt.createSelectorQuery();
        query.select('#list').boundingClientRect()
        query.exec(function (res) {
            console.log(res);
            if (e.scrollTop - (res[0].height - listHeight) > 63) {
                that.setData({
                    page: that.data.page + 1
                });
                that.getdata(that.data.page)
            }
        })
    },


    onLoad: function () {
    },
})
