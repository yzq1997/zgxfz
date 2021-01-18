const app = getApp()

Page({
    data: {
        num:11,
        dataList:[],  //数据
        page: 0,  //分页
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

    //获取数据
    getdata(i) {
        let that = this;
        tt.request({
            url: "https://weixin.jshcsoft.com/weixin_zgxfz/api_weixin/api/HomePage/GetBGImportantEventsList",
            data: {
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
                let arr = JSON.parse(JSON.parse(res.data)).Rows.map((item, index) => {
                    // console.log(item);
                    item.Joindate = item.Joindate.substring(0, 10);
                    // console.log(item.IE_ImgUrl);
                    if(item.IE_ImgUrl.indexOf('https') == -1){
                        item.IE_ImgUrl = 'https://' + item.IE_ImgUrl
                    }
                    
                    return item
                })
                // // console.log(arr);
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

        let query = tt.createSelectorQuery();
        query.select('#box').boundingClientRect()
        query.exec(function (res) {
            // console.log(res);
            if (e.scrollTop - (res[0].height - listHeight) > 63) {
                that.setData({
                    page: that.data.page + 1 
                });
                that.getdata(that.data.page)
            }
        })
    },


    onLoad: function () {
        this.getdata(this.data.page)
    },
})
