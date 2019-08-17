import { data } from '../../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    receive: false, //选择显示已发通知，或者已收通知
    receiveNoti: [],
    send_noti: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      receiveNoti: data.getNotificationList()
    })
    wx.hideLoading();
  },

  /**
   * 选择通知类型
   */
  selected(e) {
    const selected = e.currentTarget.dataset.text;
    let receive = this.data.receive;
    if (selected == 0)
      receive = false;
    else if (selected == 1)
      receive = true;
    this.setData({
      receive: receive
    })
  },

  /**
   * 跳转发送通知页面
   */
  sendnoti() {
    wx.navigateTo({
      url: '/pages/client_teacher/send_notification/index'
    })
  },

  /**
   * 跳转"通知详情"页面
   */
  showNotiDetails(e) {
    let obj = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: "/pages/notification_details/index?name=" + obj.name + "&content=" + obj.content + "&time=" + obj.time
    })
  }
})