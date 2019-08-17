// pages/client_parent/work_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    work: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      work: JSON.parse(options.work)
    })
  }
})