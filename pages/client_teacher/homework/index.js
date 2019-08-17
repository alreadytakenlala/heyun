import { data } from '../../../utils/data.js';
import { Work } from '../../../utils/entify/Work.js';
const arrayUtil = require("../../../utils/arrayUtil.js");
const util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseClass: '', //选中的班级
    chooseSubject: '', //选中的科目
    workContent: '', //作业内容
    wordCount: 0, //作业内容字数
    chooseClaim: "无要求", //选中的要求
    showTPC: false, //显示拍照组件
    signList: [], //落款数据
    sign: "",
    showSign: false, //显示落款组件
    photoArray: [], //图片路径
    showSendSuccess: false,
    errorPrompt: ''
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
   * 字数统计,内容绑定
   */
  contentInput(e) {
    let wordCount = e.detail.cursor;
    this.setData({
      wordCount: wordCount,
      workContent: e.detail.value
    })
  },

  /**
   * 跳转选择页面
   */
  choose(e) {
    let title = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '/pages/client_teacher/choose/index?title=' + title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   * 加载缓存
   */
  onShow() {
    let self = this;
    wx.getStorage({
      key: 'homeworkData',
      success: function(res) {
        self.setData(res.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   * 如果是返回上层页面，就清除数据
   */
  onHide: function () {
    let self = this;
    wx.setStorage({
      key: "homeworkData",
      data: self.data
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   * 清除缓存
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'homeworkData'
    })
  },

  /**
   * 跳转反馈页面
   */
  onGoSignature() {
    wx.navigateTo({
      url: "/pages/client_teacher/feedback/index"
    })
  },

  /**
   * 清空作业内容
   */
  clearContent() {
    this.setData({
      workContent: ''
    })
  },

  /**
   * 显示拍照组件
   */
  onShowTPC() {
    this.setData({
      showTPC: true
    })
  },

  /**
   * 隐藏拍照组件
   */
  onHTPC() {
    this.setData({
      showTPC: false
    })
  },

  /**
   * 拍照
   */
  onTakePhoto() {
    this.onHTPC();
    wx.navigateTo({
      url: "/pages/tackphoto/index"
    })
  },

  /**
   * 延时方法（把照片路径绑定到数组）
   * 发觉不延时，图片路径会自动消失，没搞清楚原因
   */
  onDelayedEvent(tempFilePath) {
    if (tempFilePath.constructor.toString().indexOf("Array") != -1) {
      setTimeout(this.onAddPhotos, 1000, tempFilePath);
    } else if (
      tempFilePath.constructor.toString().indexOf("String") != -1) {
      setTimeout(this.onAddPhoto, 1000, tempFilePath);
    }
  },

  /**
   * 添加多张图片
   */
  onAddPhotos(photos) {
    let photoArray = this.data.photoArray;
    photos.forEach(item => {
      if (photoArray.length > 2) {
        photoArray.splice(0, 1);
      }
      photoArray.push(item);
    })
    this.setData({
      photoArray: photoArray
    })
  },

  /**
   * 添加一张图片
   */
  onAddPhoto(photo) {
    let photoArray = this.data.photoArray;
    if (photoArray.length > 2) {
      photoArray.splice(0, 1);
    }
    photoArray.push(photo);
    this.setData({
      photoArray: photoArray
    })
  },

  /**
   * 从相册选择
   */
  onGetFromAlbum() {
    this.setData({
      showTPC: false
    })
    let self = this;
    wx.chooseImage({
      count: 3,
      success: function (res) {
        self.onDelayedEvent(res.tempFilePaths);
      },
      fail(err) {
        console.log("从相册获取失败!");
      }
    })
  },

  /**
   * 预览图片
   */
  onPreviewImage(e) {
    let url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.photoArray
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
    let sign = seleSign.detail;
    this.setData({
      sign: sign,
      showSign: false
    })
  },

  /**
   * 显示发布作业成功组件
   */
  onShowSendSuccess(work) {
    this.setData({
      showSendSuccess: true
    })
    setTimeout(this.onHideSendSuccess, 2000, work);
  },

  /**
   * 隐藏发布作业成功组件
   */
  onHideSendSuccess(work) {
    this.setData({
      showSendSuccess: false
    })
    let pages = getCurrentPages();
    let page = pages[pages.length - 2];
    let workList = page.data.workList;
    workList.push(work);
    page.setData({
      workList: workList,
      showType: 0
    })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 判断作业是否满足发布要求，否则弹出异常
   */
  onComplete() {
    let chooseClass = this.data.chooseClass;
    let chooseSubject = this.data.chooseSubject;
    let workContent = this.data.workContent;
    let wordCount = this.data.wordCount;
    let chooseClaim = this.data.chooseClaim;
    let sign = this.data.sign;
    let photoArray = this.data.photoArray;
    let errorPrompt;
    if (!chooseClass) {
      errorPrompt = "请选择班级"
    } else if (!chooseSubject) {
      errorPrompt = "请选择科目"
    } else if (wordCount == 0) {
      errorPrompt = "作业内容不能为空"
    }
    if (errorPrompt) {
      this.setData({
        errorPrompt: errorPrompt
      })
      return;
    }
    let work;
    let self = this;
    wx.getStorage({
      key: 'account',
      success: function(res) {
        let accountNumber = res.data.accountNumber;
        work = new Work(chooseClass, chooseSubject, workContent, photoArray, accountNumber, chooseClaim, sign, util.formatTime(new Date()), 0);
        data.addWork(work);
        self.onShowSendSuccess(work);
      }
    })
  }
})