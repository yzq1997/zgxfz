const app = getApp()

Page({
    data: {
        num: '数据',
        tab: true,
        scrtop: 0,
        num: 0,
        DataList: [],
        size: 10,
        TotalCount: 0,
        DataAll: false,
        top: false,
        tsNum: '',  //累计投诉单
        tsPercentage: '', //投诉百分比
        clo: true,  //企业申请

    },
    tab1: function () {
        this.setData({
            tab: true,
            size: 10,
            DataList: [],
            TotalCount: 0,
            DataAll: false
        })

        this.getTjList(this.data.size);

    },
    tab2: function () {
        this.setData({
            tab: false,
            size: 10,
            DataList: [],
            TotalCount: 0,
            DataAll: false
        });
        this.getNewList(this.data.size);
    },
    //获取投诉单数量
    gettsNum() {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetLoadPageZX",
            data: {},
            header: {
                // "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            success(res) {
                // console.log(JSON.parse(JSON.parse(res.data)));
                that.setData({
                    tsNum: JSON.parse(JSON.parse(res.data)).SUM,
                    tsPercentage: JSON.parse(JSON.parse(res.data)).BGL,
                });
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },

    onLoad: function () {
        tt.setStorageSync('appID', 'tt76ec0051e9d76ae6');
        tt.setStorageSync('appSecret', 'c085884b4498535a648c2dd7803e0096a254f1b8');
        let that = this;
        that.getTjList(that.data.size);
        this.gettsNum();
        //登录
        tt.login({
            force: true,
            success(res) {
                // console.log(`login 调用成功${res.code} ${res.anonymousCode}`);
                // console.log(res);
                tt.setStorageSync('code', res.code);
            },
            fail(res) {
                console.log(res);
                // console.log(`login 调用失败`);
            },
        });

        //获取code
        setTimeout(function () {
            tt.request({
                url: "https://developer.toutiao.com/api/apps/jscode2session",
                data: {
                    appid: 'tt76ec0051e9d76ae6',
                    secret: 'c085884b4498535a648c2dd7803e0096a254f1b8',
                    code: tt.getStorageSync('code'),
                    // anonymous_code: res.anonymousCode
                },
                header: {
                    "content-type": "application/json",
                },
                method: "GET",
                dataType: " json", // 指定返回数据的类型为 string
                responseType: "text",
                success(res) {
                    // console.log(JSON.parse(res.data));
                    tt.setStorageSync('openid', JSON.parse(res.data).openid);
                },
                fail(res) {
                    console.log("调用失败", res.errMsg);
                },
            });
        }, 500);

        //获取用户信息
        tt.getUserInfo({
            withCredentials: true,
            success(res) {
                // console.log(JSON.parse(res.rawData));
                tt.setStorageSync('avatarUrl', JSON.parse(res.rawData).avatarUrl);
                tt.setStorageSync('nickName', JSON.parse(res.rawData).nickName);

                // console.log(`getUserInfo 调用成功 ${res.userInfo}`);
            },
            fail(res) {
                console.log(`getUserInfo 调用失败`);
            },
        });

    },
    onShow: function () { },

    getTjList: function (e) {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetHomeRecommendList_New",
            header: {
                "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            data: {
                OpenId: '',
                AppId: 'wxb06bbaf1ed1d5322',
                ProviceName: '',
                PageNum: 0,
                PageSize: e
            },
            success(res) {
                // console.log(JSON.parse(JSON.parse(res.data)));
                that.TotalCount = JSON.parse(JSON.parse(res.data)).TotalCount;
                if (res.statusCode == 200) {
                    let DataList = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                        if (item.BG_Images != '') {
                            item.BG_Images = item.BG_Images.split(';');
                        }
                        if (item.BG_Images.length > 0) {
                            let newitem = [];
                            item.BG_Images.map((item) => {
                                if (item.indexOf('https') < 0) {
                                    item = 'https://' + item;
                                    newitem.push(item);
                                }
                                return item;
                            })
                            item.BG_Images = newitem;
                        }
                        return item;
                    })
                    // console.log(DataList)
                    if (DataList.length == that.TotalCount && that.TotalCount != 0) {
                        that.setData({
                            DataList: DataList,
                            DataAll: true
                        })
                    }

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

    getNewList: function (e) {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetHomeNewestList",
            header: {
                "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            data: {
                OpenId: '',
                AppId: 'wxb06bbaf1ed1d5322',
                ProviceName: '',
                PageNum: 0,
                PageSize: e
            },
            success(res) {
                that.TotalCount = JSON.parse(JSON.parse(res.data)).TotalCount;
                if (res.statusCode == 200) {
                    let DataList = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                        if (item.BG_Images != '') {
                            item.BG_Images = item.BG_Images.split(';');
                        }
                        if (item.BG_Images.length > 0) {
                            let newitem = [];
                            item.BG_Images.map((item) => {
                                if (item.indexOf('https') < 0) {
                                    item = 'https://' + item;
                                    newitem.push(item);
                                }
                                return item;
                            })
                            item.BG_Images = newitem;
                        }
                        return item;
                    })
                    if (DataList.length == that.TotalCount && that.TotalCount != 0) {
                        that.setData({
                            DataList: DataList,
                            DataAll: true
                        })
                    }

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

    //跳转搜索页面
    goSearch() {
        tt.reLaunch({
            url: `../search/index`,
            success(res) {
                // console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },

    //监听页面滚动，定位tab
    onPageScroll: function () {
        const query = tt.createSelectorQuery();
        query.select('#ada').boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res => {
            if (res[1].scrollTop > 200) {
                this.setData({
                    top: true
                })
            } else {
                this.setData({
                    top: false
                })
            }
            this.setData({
                scrtop: res[1].scrollTop,
            })

        })
    },

    onReachBottom: function () {
        this.setData({
            size: this.data.size + 10
        })
        if (this.data.tab) {
            this.getTjList(this.data.size)
        } else {
            this.getNewList(this.data.size)
        }

    },

    gotop: function () {
        tt.pageScrollTo({
            scrollTop: 0
        })
    },

    //企业申请
    enterprise() {
        tt.reLaunch({
            url: `../qysq/index`,
            success(res) {
                // console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        });
    },
    close() {
        this.setData({
            clo: false
        })
    }
})
