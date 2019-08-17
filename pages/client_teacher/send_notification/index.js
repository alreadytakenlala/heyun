import { data } from '../../../utils/data.js';
const arrayUtil = require("../../../utils/arrayUtil.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "发通知",
    wordCount: 0, //字数统计
    timedSend: false, //是否按时发送
    sendSelf: false, //是否同时发送给自己
    receiveObj: '',
    receiveObjCount: '',
    signList: [], //落款数据
    sign: "",
    showSign: false //显示落款组件
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载数据
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    let signList = [];
    data.getRoleTeacherList("13435200189").forEach(item => {
      let name = item.getName();
      signList.push(name);
      signList.push(name.charAt(0) + "老师");
      signList.push(name + "老师");
    })
    signList.push("无落款");
    this.setData({
      sign: signList[0],
      signList: signList
    })
    wx.hideLoading();
  },

  /**
   * 字数统计，数据绑定
   */
  contentInput(e) {
    let wordCount = e.detail.cursor;
    this.setData({
      wordCount: wordCount
    })
  },

  /**
   * 定时发送
   */
  timedSend(e) {
    let timedSend = this.data.timedSend;
    this.setData({
      timedSend: !timedSend
    })
  },

  /**
   * 同时发送给自己
   */
  sendSelf(e) {
    let sendSelf = this.data.sendSelf;
    this.setData({
      sendSelf: !sendSelf
    })
  },

  /**
   * 跳转选择接收对象页面
   */
  showSeleObj() {
    wx.navigateTo({
      url: "/pages/client_teacher/selected_receive/index"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   * 加载数据
   */
  onShow: function () {
    let self = this;
    wx.getStorage({
      key: 'sendNotificationData',
      success: function(res) {
        self.setData(res.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   * 缓存数据
   */
  onHide: function () {
    let data = this.data;
    wx.setStorage({
      key: 'sendNotificationData',
      data: data
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   * 清除缓存
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'sendNotificationData'
    })
  },

  /**
   * 显示落款组件
   */
  showSign() {
    this.setData({
      showSign: true
    })
  },


  /**
   * 隐藏落款组件
   */
  hideSign() {
    this.setData({
      showSign: false
    })
  },

  /**
   * 更落款选择
   */
  chanSele(seleSign) {
    let signature = seleSign.detail;
    this.setData({
      sign: signature,
      showSign: false
    })
  }
})