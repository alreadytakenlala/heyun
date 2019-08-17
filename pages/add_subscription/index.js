import { data } from '../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList: [],
    grade: 0,
    gradeList: [],
    errorPrompt: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      topicList: data.getTopicList(1, 10, "推荐订阅"),
      gradeList: data.getClassification()
    })
    wx.hideLoading();
  },

  /**
   * 切换页面左部分类
   */
  onSwitchGrade(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      grade: index
    })
    let classification = this.data.gradeList[index];
    let topicList = data.getTopicList(1, 10, classification);
    this.setData({
      topicList: topicList
    })
  },

  /**
   * 添加订阅
   */
  onAddSubscription(e) {
    let index = e.currentTarget.dataset.index;
    let classification = e.currentTarget.dataset.text;
    let topicList = this.data.topicList;
    let topic = topicList[index];
    let hasSubscription = topic.getHasSubscription();
    data.addSubscription(classification, index, !hasSubscription);
    topic.setHasSubscription(!hasSubscription);
    this.setData({
      topicList: topicList,
      errorPrompt: !hasSubscription ? "订阅成功":''
    })
  }
})