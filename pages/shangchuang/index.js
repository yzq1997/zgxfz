Page({
    data: {
        //输入的文本数量
        textareanumber: 0,                      
        //上传图片组件
        sourceIndex: 2,
        sourceArray: ['拍照', '相册', '拍照或相册'],
        sizeIndex: 2,
        sizeArray: ['压缩', '原图', '压缩或原图'],
        countIndex: 0,
        countArray: [],
        imageList: []
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
    },
    bindInput(e) {
        this.setData({ 
            textareanumber: e.detail.cursor
        })
    },
    //上传图片组件
    selectImage() {
        const sourceIndex = this.data.sourceIndex;
        if( this.data.imageList.length < 3 ){
            const count = this.data.countIndex + 1;
            if (sourceIndex === 2) {
                tt.showActionSheet({
                    itemList: ['拍照', '相册'],
                    success: res => {
                        const sourceType = res.tapIndex === 0 ? 'camera' : 'album';
                        this.chooseImage(sourceType, count);
                    }
                });
            } else {
                const sourceType = sourceIndex === 0 ? 'camera' : 'album';
                this.chooseImage(sourceType, count);
            }
        }else{
                tt.showToast({
                    title: '最多三张哦~',
                })
        }
    },
    chooseImage(sourceType, count) {
        const sizeIndex = this.data.sizeIndex ;
        let sizeType = ['compressed', 'original'];
        if (sizeIndex === 0) {
            sizeType = ['compressed'];
        } else if (sizeIndex === 1) {
            sizeType = ['original'];
        }
        tt.chooseImage({
            count,
            sizeType,
            sourceType: [sourceType],
            success: res => {
                console.log(res);
                var image = res.tempFilePaths[0];
                var arr = this.data.imageList;
                arr.push(image);
                this.setData('imageList', arr);
            },
            fail: err => {
                console.log('chooseImage fail', err);
            }
        });
    },
    delpic: function(e){
        var idx = e.currentTarget.dataset.index;
        var imageList = this.data.imageList;
        imageList.splice(idx, 1);
        this.setData('imageList', imageList);
    }
});