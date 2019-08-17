import { data } from '../../utils/data.js';
import { Role } from '../../utils/entify/Role';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 1, //男：0, 女：1
    nameValue: '',
    school: '',
    bj: ''
  },

  onLoad(options) {
    this.setData({
      school: options.school,
      bj: options.bj
    })
  },

  /**
   * 完成处理
   */
  onComplete() {
    let self = this;
    wx.getStorage({
      key: 'account',
      success: function(res) {
        let accountNumber = res.data.accountNumber;
        let roleList = data.getRoleList(accountNumber);
        if (roleList.length == 1 && !roleList[0].getName()) {
          data.updataRole(accountNumber, self.data.nameValue, self.data.school, self.data.bj, false, self.data.gender);
          wx.setStorage({
            key: 'userInfo',
            data: data.getRoleList(accountNumber)[0]
          })
        } else {
          data.addRole(accountNumber, self.data.nameValue, "家长", self.data.school, self.data.bj, false, self.data.gender);
        }
        wx.switchTab({
          url: "/pages/index/index"
        })
      }
    })
  },

  /**
   * 选择性别
   */
  onSelectGender(e) {
    let gender = e.currentTarget.dataset.text;
    this.setData({
      gender: Number(gender)
    })
  },

  /**
   * 绑定名字输入
   */
  onNameInput(e) {
    let value = e.detail.value;
    this.setData({
      nameValue: value
    })
  }
})