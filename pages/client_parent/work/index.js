import { data } from '../../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1, //初始值第一页
    size: 5, //分页大小
    workList: [], //作业列表
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let index = this.data.index;
    let size = this.data.size;
    this.setData({
      workList: data.getWorkList(index, size)
    })
    wx.hideLoading();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    let size = this.data.size;
    this.setData({
      index: 1,
      workList: data.getWorkList(1, size),
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
      let index = this.data.index;
      let size = this.data.size;
      let workList = this.data.workList;
      let list = data.getWorkList(++index, size);
      list.forEach(item => {
        workList.push(item);
      })
      this.setData({
        index: index,
        workList: workList
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
   * 跳转详情页面
   */
  onJumpDetail(e) {
    let index = e.currentTarget.dataset.index;
    let workList = this.data.workList;
    wx.navigateTo({
      url: "/pages/client_parent/work_detail/index?work=" + JSON.stringify(workList[index])
    })
  }
})