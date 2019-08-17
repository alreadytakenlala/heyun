import { data } from '../../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiveNoti: []
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
   * 跳转"通知详情"页面
   */
  showNotiDetails(e) {
    let obj = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: "/pages/notification_details/index?name=" + obj.name + "&content=" + obj.content + "&time=" + obj.time
    })
  }
})