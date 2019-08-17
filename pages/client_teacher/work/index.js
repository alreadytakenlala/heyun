import { data } from '../../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList: [],
    showType: 1 //已发布作业:0, 发布作业:1
  },

  onLoad() {
    this.setData({
      workList: data.getWorkList(1, 99)
    })
  },

  /**
   * 跳转布置作业页面
   */
  homework() {
    wx.navigateTo({
      url: '/pages/client_teacher/homework/index'
    })
  },

  /**
   * 选择通知类型
   */
  selected(e) {
    const showType = e.currentTarget.dataset.text;
    let receive = this.data.receive;
    this.setData({
      showType: showType
    })
  },
})