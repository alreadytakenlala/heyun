Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 跳转"发送给全班"页面
   */
  sendClass() {
    wx.navigateTo({
      url: "/pages/client_teacher/send_class/index"
    })
  },

  /**
   * 跳转到"发给个人"页面
   */
  sendIndividual(e) {
    wx.navigateTo({
      url: "/pages/client_teacher/send_individual/index?title=" + e.currentTarget.dataset.text
    })
  }
})