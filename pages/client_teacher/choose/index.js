const arrayUtil = require('../../../utils/arrayUtil.js');
import { data } from '../../../utils/data.js';

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    items: [], //班级名字列表
    chooseItems: []
  },

  /**
   * 班级选择添加
   */
  chooseAdd(e) {
    const index = e.currentTarget.dataset.text;
    let chooseItems = this.data.chooseItems;
    chooseItems[index] == null ? 
      chooseItems[index] = this.data.items[index]:
      chooseItems[index] = null
    this.setData({
      chooseItems: chooseItems
    })
  },

  /**
   * 数据缓存，返回上一层页面
   */
  showHomeworkView() {
    let title = this.data.title; //数据标题
    let chooseString = arrayUtil.arrayConversionString(this.data.chooseItems); //选中的数据
    wx.getStorage({
      key: 'homeworkData',
      success: function(res) {
        let homeworkData = res.data; //布置作业页面的缓存数据
        if (title == "班级")
          homeworkData.chooseClass = chooseString;
        else if (title == "科目")
          homeworkData.chooseSubject = chooseString;
        wx.setStorage({
          key: 'homeworkData',
          data: homeworkData
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    let title = options.title; //页面标题
    if (title == "班级") {
      let classCollection = [];
      data.getBjList().forEach(item => {
        classCollection.push(item.title);
      })
      this.setData({
        items: classCollection
      })
    }
    else if (title == "科目")
      this.setData({
        items: data.getSubject()
      })
    this.setData({
      title: title
    })
    wx.setNavigationBarTitle({
      title: title
    })
    this.cacheData(title);
    wx.hideLoading();
  },

  /**
   * 获取缓存数据，并选中页面数据
   */
  cacheData(title) {
    let self = this;
    wx.getStorage({
      key: 'homeworkData',
      success: function(res) {
        let chooseString; //缓存的字符串数据
        if (title == "班级")
          chooseString = res.data.chooseClass;
        else if (title == "科目")
          chooseString = res.data.chooseSubject;
        let array = chooseString.split(','); //用来赋予data中的"选中数据"
        let chooseItems = arrayUtil.contrastSortArray(self.data.items, array); //data中的"选中数据"
        self.setData({
          chooseItems: chooseItems
        })
      },
    })
  }
})