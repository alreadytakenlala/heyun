Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 跳转输入班级码页面
   */
  classCode() {
    wx.navigateTo({
      url: "/pages/class_code/index"
    })
  },

  /**
   * 跳转首页
   */
  jumpOver() {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 扫码
   */
  onScanCode() {
    wx.scanCode({
      success(res) {
        console.log(res);
      }
    })
  },

  /**
   * 跳转申请加入页面
   */
  onApplicationsJoin() {
    wx.navigateTo({
      url: "/pages/applications_join/index"
    })
  }
})