// pages/setting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgNoti: true, //消息通知
    draftSendNotiReserved: true, //草稿箱发送通知后仍保留
    pwLock: false, //密码锁设置
    accountNumber: '' //登录账户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let self = this;
    wx.getStorage({
      key: 'account',
      success: function(res) {
        self.setData({
          accountNumber: res.data.accountNumber
        })
      }
    })
  },

  /**
   * 消息通知修改
   */
  msgNoti() {
    let msgNoti = this.data.msgNoti;
    this.setData({
      msgNoti: !msgNoti
    })
  },

  /**
   * 草稿箱通知发送后仍保留修改
   */
  draftSendNotiReserved() {
    let draftSendNotiReserved = this.data.draftSendNotiReserved;
    this.setData({
      draftSendNotiReserved: !draftSendNotiReserved
    })
  },

  /**
   * 密码锁设置
   */
  pwLock() {
    let pwLock = this.data.pwLock;
    this.setData({
      pwLock: !pwLock
    })
  },

  /**
   * 退出登录
   */
  logout() {
    wx.removeStorage({
      key: 'userInfo'
    })
    wx.removeStorage({
      key: 'account'
    })
    wx.reLaunch({
      url: "/pages/index/index"
    })
  }
})