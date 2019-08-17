Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImagePath: '',
    tempFilePaths: []
  },

  /**
   * 阻止打开摄像头触发事件
   */
  preventOpeningCamera() {
    console.log("阻止打开摄像头");
  },

  /**
   * 拍照事件
   */
  takePhoto() {
    let self = this;
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'hign',
      success(res) {
        self.setData({
          tempImagePath: res.tempImagePath
        })
      },
      fail(err) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  /**
   * 相册选图
   */
  openAlbum() {
    let self = this;
    wx.chooseImage({
      count: 3,
      sourceType: 'album',
      success: function(res) {
        self.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },

  /**
   * 完成,携带数据返回
   */
  onComplete() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.onDelayedEvent(this.data.tempImagePath);
    wx.navigateBack({
      delta: 1
    })
  }
})