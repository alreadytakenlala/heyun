import { data } from '../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: [],
    listType: 0, //选择市:0, 选择区:1, 选择学校:2, 选择班级:3
    selectData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let listType = options.listType;
    if (listType == 0) {
      this.setData({
        option: JSON.parse(data.getCityList()),
        listType: Number(listType),
        selectData: "广东"
      })
    }
    else if (listType == 2) {
      this.setData({
        option: JSON.parse(data.getSchoolList()),
        listType: Number(listType),
        selectData: options.district
      })
    }
    wx.hideLoading();
  },

  /**
   * 选择城市
   */
  onSelected(e) {
    let index = e.currentTarget.dataset.index;
    let obj = this.data.option[index];
    let selectData = this.data.selectData;
    let listType = this.data.listType;
    let option;
    if (listType == 0) {
      option = obj.districtList;
    } else if (listType == 1) {
      this.comeBack(obj);
      return;
    } else if (listType == 2) {
      option = obj.bjList;
    } else if (listType == 3) {
      this.comeBack(obj);
      return;
    }
    this.setData({
      option: option,
      selectData: selectData + " - " + obj.name,
      listType: listType + 1
    })
  },

  /**
   * 选择完毕，返回上层页面
   */
  comeBack(obj) {
    let pages = getCurrentPages();
    let previousPage = pages[pages.length - 2];
    let selectArray = this.data.selectData.split(' - ');
    let listType = this.data.listType;
    if (listType == 1) {
      previousPage.setData({
        district: selectArray[1] + ' ' + obj
      })
    } else if (listType == 3) {
      previousPage.setData({
        bj: selectArray[1] + ' ' + obj
      })
    }
    wx.navigateBack({
      delta: 1
    })
  }
})