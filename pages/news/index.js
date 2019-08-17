import { data } from '../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList: [],
    searchValue: '',
    articleList: [],
    articleIndex: 1, //页数
    articleSize: 5, //每次请求五篇文章
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let articleIndex = this.data.articleIndex;
    let articleSize = this.data.articleSize;
    this.setData({
      articleList: data.getArticleList(articleIndex, articleSize)
    })
    wx.hideLoading();
  },

  onShow() {
    this.setData({
      topicList: data.getHasSubscription()
    })
  },

  /**
   * 搜索栏值绑定
   */
  onSearchInput(e) {
    let value =e. detail.value;
    this.setData({
      searchValue: value
    })
  },

  /**
   * 切换专栏
   */
  onSwitchTopic(e) {
    let index = e.currentTarget.dataset.index;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    let size = this.data.articleSize;
    this.setData({
      articleIndex: 1,
      articleList: data.getArticleList(1, size),
      noData: false
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading();
    if (!this.data.noData) {
      let index = this.data.articleIndex;
      let size = this.data.articleSize;
      let articleList = this.data.articleList;
      let list = data.getArticleList(++index, size);
      list.forEach(item => {
        articleList.push(item);
      })
      this.setData({
        articleIndex: index,
        articleList: articleList
      })
      if (list.length == 0) {
        this.setData({
          noData: true
        })
      }
    }
    wx.hideNavigationBarLoading();
  },

  /**
   * 跳转添加订阅页面
   */
  onAddSubscription() {
    wx.navigateTo({
      url: "/pages/add_subscription/index"
    })
  }
})