const app = getApp()

var QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
const wxMap = new QQMapWX({
    key: 'OGKBZ-4VCKW-65BRO-OKONK-TVJCH-KCBFD'
});


Page({
    data: {
        // longitude: 118.800,
        longitude: 118.8921,  //经度
        // longitude: 116.23128,  //经度
        latitude: 32,
        // latitude: 31.32751,  //维度
        // latitude: 40.22077,  //维度
        scale: 8,
        address: '',
        markers: [
            {
                id: 1,
                latitude: 32,
                longitude: 118.800,
                title: "这是地标1",
            },

        ],
    },
    //点击搜索按钮
    search() {
        // this.setData({
        //     longitude: 118.8921,
        //     latitude: 31.32751,
        // })

        this.addres();
    },

    //
    bindinput(e) {
        // console.log(e.detail.value);
        this.setData({
            address: e.detail.value
        })
    },

    //获取地址
    reverseGeoCoder(lat, lng) {
        var _this = this
        wxMap.reverseGeocoder({
            location: {
                // 你的经纬度
                latitude: lat,
                longitude: lng,
            },
            success: function (res) {
                // console.log(res.result.address);

                _this.setData({
                    address: res.result.address
                })
                _this.setData({
                    currenAddress: res.result.address
                })
            },
            fail: function (res) {
                console.log(res);
            }
        })
    },

    //geoCoder 根据地址获取经纬度
    addres() {
        let that = this;
        // console.log(that.data.address);
        wxMap.geocoder({
            address: that.data.address,                  //需要转换为经纬度的地址
            success: function (res) {               //返回的数据里面有该地址的经纬度
                let location = res.result.location    //经纬度对象
                // console.log(location)
                that.setData({
                    longitude: location.lng,
                    latitude: location.lat,
                });
                // 使用微信内置地图查看位置
                // tt.openLocation({
                //     type: 'gcj02',                      // 返回可以用于wx.openLocation的经纬度 
                //     latitude: location.lat,
                //     longitude: location.lng,
                //     scale: 18
                // })
            },
            fail: function (res) {
                console.log("qqmapsdk.geocoder 接口调用失败返回的回调")
            },
            complete: function (res) {
                // console.log(“complete”); 
            }
        });
    },


    //点击地图
    maptap(e) {
        // console.log(e);
        this.reverseGeoCoder(e.detail.latitude, e.detail.longitude)
    },

    regionchange(e) {
        console.log("regionchange", e);
    },




    onLoad: function () {

    },
})
