const app = getApp()

Page({
    data: {
        fqheight: 0,
        tgheight: 0,
        csheight: 0,
        detailData: "",
        supperList: "",
        tsData: "",
        tsTotalCount: 0,
        code:'',
        comments:'',
        zlShow:false,//是否助力过
        zlTrue:false,
    },
    onLoad: function (e) {
        // console.log(e);
        this.setData({
            code:e.id
        })
        this.GetDetail(e.id);
        this.GetSupportStaffList(e.id);
        this.GetComplaintsProcessList(e.id);
    },

    //获取头部信息
    GetDetail: function (id) {
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
                Code: id
            },
            success(res) {
                console.log(JSON.parse(JSON.parse(res.data)))
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

    //获取头像
    GetSupportStaffList: function (id) {
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
                BG_Code: id
            },
            success(res) {
                console.log(JSON.parse(JSON.parse(res.data)))
                JSON.parse(JSON.parse(res.data)).Rows.map(item=>{
                    if(item.SS_OpenID == tt.getStorageSync('openid')){
                        that.setData({
                            zlShow:true
                        })
                    }
                })
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

    GetComplaintsProcessList: function (id) {
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
                Code: id
            },
            success(res) {
                // console.log(JSON.parse(JSON.parse(res.data)))
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

    //一起投诉它
    goComplaint(){
        // let id = e.currentTarget.dataset.alphaBeta;
        tt.reLaunch({
            url: `../search_ts/index?id=${this.data.code}`,
            success(res) {
                // console.log(res);
            },
            fail(res) {
                console.log(`reLaunch调用失败`);
            }
        }, 200);
    },

    //输入框内容
    handleInput(e){
        // console.log(e.detail.value);
        this.setData({
            comments:e.detail.value
        })
    },

    //发表评论
    submit(){
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/AddUserComment",
            header: {
                "content-type": "application/json",
            },
            method: "POST",
            dataType: " json", // 指定返回数据的类型为 string
            responseType: "text",
            data: {
                CommentBody:that.data.comments,
                NickName:tt.getStorageSync('nickName'),
                OpenID:tt.getStorageSync('openid'),
                AppID:'tt76ec0051e9d76ae6',
                UserHeadImg:tt.getStorageSync('avatarUrl'),
                BG_Code:that.data.detailData.BG_Code
            },
            success(res) {
                // console.log(JSON.parse(JSON.parse(res.data)))
                tt.showToast({ title: "评论成功,待审核" });
                that.setData({
                    comments:''
                })
                
            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },

    //助力
    clickImg(){
        let that = this;
        if(that.data.zlShow){
            //吧图片出来
            that.setData({
                zlTrue:true
            });
            return false;
        }else{
            tt.request({
                url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/AddSupportStaff",
                header: {
                    "content-type": "application/json",
                },
                method: "POST",
                dataType: " json", // 指定返回数据的类型为 string
                responseType: "text",
                data: {
                    ComplaintCode:that.data.detailData.BG_Code,
                    WeChatName:tt.getStorageSync('nickName'),
                    OpenID:tt.getStorageSync('openid'),
                    AppID:'tt76ec0051e9d76ae6',
                    Photo:tt.getStorageSync('avatarUrl'),
                    BG_Code:that.data.detailData.BG_Code
                },
                success(res) {
                    // console.log(JSON.parse(JSON.parse(res.data)))
                    tt.showToast({ title: "助力成功" });   
                    that.GetSupportStaffList(that.data.code);
                    that.setData({
                        zlShow:true
                    })
                },
                fail(res) {
                    console.log("调用失败", res.errMsg);
                },
            });
        }
        
    },

    noShow(){
        this.setData({
            zlTrue:false
        })
    },


    onReady: function () {
        var that = this;
        const query = tt.createSelectorQuery();
        // console.log(that.data.tsTotalCount);
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
