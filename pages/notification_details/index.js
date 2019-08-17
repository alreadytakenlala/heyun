Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    content: '',
    time: '',
    reply: false
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载数据
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      content: options.content,
      time: options.time
    })
  },

  /**
   * 显现回复组件
   */
  onSRC() {
    this.setData({
      reply: true
    })
  }
})