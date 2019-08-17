const arrayUtil = require('../../../utils/arrayUtil.js');
import { data } from '../../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classCollection: [],
    selected: [],
    selectAll: false
  },
  
  /**
   * 把选中的数据添加进选中数组
   */
  selected(e) {
    let index = e.currentTarget.dataset.text;
    let selected = this.data.selected;
    let array = this.data.classCollection;
    selected[index] == this.data.classCollection[index] ?
      selected[index] = null : selected[index] = this.data.classCollection[index]
    this.setData({
      selected: selected
    })
    this.setData({
      selectAll: arrayUtil.isSelectAll(array, selected),
    })
  },

  /**
   * 全选按钮
   */
  selectAll() {
    let selectAll = this.data.selectAll;
    let array = this.data.classCollection;
    let selected = [];
    if (!selectAll)
      array.forEach((item, i) => {
        selected[i] = item;
      })
    this.setData({
      selectAll: !selectAll,
      selected: selected
    })
  },

  /**
   * 确定，缓存数据
   */
  complete() {
    let selected = this.data.selected;
    let chooseString = arrayUtil.arrayConversionString(selected);
    let receiveObjCount;
    this.data.selectAll ? receiveObjCount = "全部":receiveObjCount = "共" + selected.length + "班";
    wx.getStorage({
      key: 'sendNotificationData',
      success: function(res) {
        let sendNotificationData = res.data;
        sendNotificationData.receiveObj = chooseString;
        sendNotificationData.receiveObjCount = receiveObjCount;
        wx.setStorage({
          key: 'sendNotificationData',
          data: sendNotificationData
        })
        wx.navigateBack({
          delta: 2
        })
      }
    })
  },

  /**
 * 生命周期函数--监听页面加载
 * 加载数据
 */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    let classCollection = [];
    data.getBjList().forEach(item => {
      classCollection.push(item.title);
    })
    this.setData({
      classCollection: classCollection
    })
    let self = this;
    wx.getStorage({
      key: 'sendNotificationData',
      success: function(res) {
        let array = res.data.receiveObj.split(',');
        let selected = arrayUtil.contrastSortArray(self.data.classCollection, array);
        self.setData({
          selected: selected
        })
      }
    })
    wx.hideLoading();
  },
})