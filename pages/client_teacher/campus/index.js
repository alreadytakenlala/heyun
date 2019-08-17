const arrayUtil = require("../../../utils/arrayUtil.js");
import { data } from '../../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "和云教育",
    showGoBack: false,
    userInfo: {},
    checkIn: false,
    modules: [],
    selectedNav: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        let appModule;
        if (res.data.career == "老师") {
          appModule = data.getTeacherAppModule();
        }
        self.setData({
          userInfo: res.data,
          modules: appModule
        })
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
      url = '/pages/client_teacher/work/index'
    else if (title == '通知')
      url = '/pages/client_teacher/notification/index'
    else if (title == '班级圈')
      return;
    else if (title == '学生表现')
      url = '/pages/client_teacher/performance/index'
    else if (title == '通讯录')
      url = '/pages/client_teacher/address_book/index'
    else if (title == '评价')
      url = '/pages/client_teacher/evaluation/index'
    else if (title == '资讯')
      url = '/pages/client_teacher/news/index'
    if (url)
    wx.navigateTo({
      url: url
    })
  }
})