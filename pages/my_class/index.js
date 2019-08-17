Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: '',
    bj: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      school: options.school,
      bj: options.bj
    })
  },

  /**
   * 加入班级
   */
  joinClass() {
    wx.navigateTo({
      url: "/pages/join/index?school=" + this.data.school + "&bj=" + this.data.bj
    })
  }
})