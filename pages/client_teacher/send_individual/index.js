const arrayUtil = require("../../../utils/arrayUtil.js");
import { data } from '../../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modules: [],
    teacherPage: false, //是否是教师页面
    selectAll: false, //是否全选
    dropDownModu: [], //记录下拉的模块
    selectedPerson: [] //选中的人物，这是一个modules的拷贝
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    let modules;
    let title = options.title;
    let teacherPage;
    if (title == "发给个人") {
      modules = data.getBjList();
      teacherPage = false;
    }
    else if (title == "发给老师") {
      modules = data.getTeacherData();
      teacherPage = true;
    }
    this.setData({
      modules: modules,
      teacherPage: teacherPage
    })
    wx.hideLoading();
  },

  /**
   * 全选
   */
  selectAll() {
    let selectAll = this.data.selectAll;
    let modules = this.data.modules;
    let selectedPerson = [];
    if (!selectAll)
      modules.forEach(item => {
        selectedPerson.push(item);
      })
    this.setData({
      selectAll: !selectAll,
      selectedPerson: selectedPerson
    })
  },

  /**
   * 选中模块
   */
  selectedModu(e) {
    let index = e.currentTarget.dataset.text; //选中的模块索引
    let sp = this.data.selectedPerson; //选择的人物列表
    let modules = this.data.modules; //全部的模块列表
    let module = modules[index];
    if (sp[index]) {
      sp[index].title == module.title ?
        sp[index] = null :
        sp[index] = module
    } else {
      sp[index] = module
    }
    this.setData({
      selectAll: arrayUtil.isSelectAll(modules, sp),
      selectedPerson: sp
    })
  },

  /**
   * 打开下拉列表
   */
  dropDown(e) {
    if (e.target.dataset.target == "self") {
      let index = e.currentTarget.dataset.text;
      let dropDownModu = this.data.dropDownModu;
      if (!dropDownModu[index])
        dropDownModu[index] = true;
      else
        dropDownModu[index] = false;
      this.setData({
        dropDownModu: dropDownModu
      })
    }
  },

  /**
   * 选中人物
   */
  selectedPerson(e) {
    //索引
    let dataset = e.currentTarget.dataset;
    let index = dataset.index;
    let seat = dataset.seat;
    //选中的人物列表
    let sp = this.data.selectedPerson;
    //模块列表
    let modules = [];
    arrayUtil.deepClone(this.data.modules, modules);
    let person = modules[index].persons[seat];
    
    /*
     * 选中人物，如果取消选中，则去掉全选
     */
    if (sp[index]) {
      let spi = sp[index].persons;
      if (spi[seat] == person) {
        spi[seat] = null;
        this.setData({
          selectAll: false
        })
      }
      else {
        spi[seat] = person
      }
    } else {
      sp[index] = modules[index];
      sp[index].persons = [];
      sp[index].persons[seat] = person;
    }

    /*
     * 如果一个模块中人物全部没选，则取消掉模块选择
     */
    if (arrayUtil.isAllEmpty(sp[index].persons))
      sp[index] = null;
    this.setData({
      selectedPerson: sp
    })
  },

  /**
   * 确定
   */
  complete() {
    let selectedPerson = this.data.selectedPerson;
    let selectAll = this.data.selectAll;
    wx.getStorage({
      key: "sendNotificationData",
      success(res) {
        let receiveObj = "";
        selectedPerson.forEach((item,i) => {
          receiveObj += arrayUtil.arrayConversionString(item.persons);
          if (i != (selectedPerson.length - 1))
            receiveObj += ',';
        })
        let receiveObjCount;
        selectAll ? receiveObjCount = "全部" : receiveObjCount = "共" + receiveObj.split(',').length + "人";
        let sendNotificationData = res.data;
        sendNotificationData.receiveObj = receiveObj;
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
  }
})