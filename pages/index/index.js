const arrayUtil = require("../../utils/arrayUtil.js");
import { data } from '../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGoBack: false,
    userInfo: {},
    checkIn: false,
    modules: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (!this.data.userInfo.accountNumber)
      this.loadData();
  },

  onReady() {

  },

  /**
   * 加载数据
   */
  loadData() {
    let self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        let appModule;
        let career = String(res.data.career);
        if (career == "家长") {
          appModule = data.getParentAppModule();
          self.setData({
            userInfo: res.data,
            modules: appModule
          })
        }
        else if (career == "老师") {
          wx.reLaunch({
            url: '/pages/client_teacher/campus/index'
          })
        }
      },
      fail(err) {
        let appModule = data.getParentAppModule();
        self.setData({
          userInfo: '',
          modules: appModule
        })
      }
    })
    wx.hideLoading();
  },

  onShow() {
    if (!this.data.userInfo.accountNumber) {
      let self = this;
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          self.setData({
            userInfo: res.data,
            modules: data.getParentAppModule()
          })
        }
      })
    }
  },

  /**
   * 签到
   */
  checkIn() {
    this.setData({
      checkIn: true
    })
  },

  /**
   * 跳转模块对应页面
   */
  showListView(e) {
    let title = e.currentTarget.dataset.text;
    let url;
    if (title == '作业')
      url = '/pages/client_parent/work/index'
    else if (title == '通知')
      url = '/pages/client_parent/notification/index'
    else if (title == '班级圈')
      url = '/pages/notification/index'
    else if (title == '学生表现')
      url = '/pages/performance/index'
    else if (title == '通讯录')
      url = '/pages/address_book/index'
    else if (title == '评价')
      url = '/pages/evaluation/index'
    else if (title == '资讯')
      url = '/pages/news/index'
    wx.navigateTo({
      url: url
    })
  },

  /**
   * 跳转登录页面
   */
  showLogoPage() {
    wx.navigateTo({
      url: '/pages/logo/index'
    })
  },

  /**
   * 跳转注册页面
   */
  registered() {
    wx.navigateTo({
      url: '/pages/registered/index'
    })
  }
})