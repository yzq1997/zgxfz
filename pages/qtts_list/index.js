const app = getApp()

Page({
    data: {
        title: '',  //标题
        from: '',  //来源
        imgurl: '', //图片
        tsNum: '', //投诉条数
        main: '',  //投诉介绍
        dataList: [], //列表数据
        page:0, //分页
        newId:0,
    },
    //获取数据-头部
    getdata(id) {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetBGImportantEvents",
            data: {
                eventID: id,
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
                let arr = JSON.parse(JSON.parse(res.data))
                if (arr.IE_ImgUrl.indexOf('https') == -1) {
                    arr.IE_ImgUrl = 'https://' + arr.IE_ImgUrl
                }
                that.setData({
                    title: arr.IE_Title,
                    from: arr.IE_ExposureBody,
                    imgurl: arr.IE_ImgUrl,
                    tsNum: arr.IE_RelationSingleCount,
                    main: arr.IE_Introduction
                });

            },
            fail(res) {
                console.log("调用失败", res.errMsg);
            },
        });
    },

    //获取数据-主体
    getdataMain(newid) {
        let that = this;
        this.setData({
            newId:newid
        })
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetBGListByEventsRelationCode",
            data: {
                RelationCode: newid,
                PageNum: this.data.page,
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
                let arr = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                    // console.log(item);
                    item.CA_TS_Date = item.CA_TS_Date.substring(0, 10);
                    item.BG_Images = item.BG_Images.split(";")
                    if (item.BG_Images == "") {
                        item.BG_Images = [];
                    };
                    item.BG_Images.map((t,index)=>{
                        if(t.indexOf('http') == -1){
                            if(t.indexOf(':443') == -1){
                                item.BG_Images[index] = 'http://' + t;
                            }else{
                                item.BG_Images[index] = 'https://' + t;
                            }
                            
                            return t
                        }
                    })
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
    onLoad: function (e) {
        // console.log(e);
        this.getdata(e.id);
        this.getdataMain(e.newid)
    },

    // 获取滚动条当前位置
    onPageScroll: function (e) { 
        // console.log(e)  //2206
        let that = this;
        let listHeight = ''; //当前屏幕的高度 

        tt.getSystemInfo({
            success: function (res) {
                // console.log(res);
                listHeight = res.windowHeight;
                
            }
        });
        
        let query = tt.createSelectorQuery();
        query.select('#list').boundingClientRect()
        query.exec(function (res) {
            // console.log(res);
            // console.log(listHeight)
            // 2424
            // console.log(res[0].height);
            // console.log(e.scrollTop);
            if ((res[0].height - e.scrollTop) == 219) {
                that.setData({
                    page: that.data.page + 1 
                });
                that.getdataMain(that.data.newId)
            }
        })
    },
})
