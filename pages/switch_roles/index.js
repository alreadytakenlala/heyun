import { data } from '../../utils/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountNumber: '',
    roleList: [],
    graduationRoleList: [],
    showGraduationRole: false,
    logoRole: -1 //登录的角色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let self = this;
    wx.getStorage({
      key: 'account',
      success: function(res) {
        let accountNumber = res.data.accountNumber;
        self.setData({
          accountNumber: accountNumber,
          roleList: data.getNoGraduationRoleList(accountNumber),
          graduationRoleList: data.getGraduationRoleList(accountNumber)
        })
      }
    })
    this.deepColor();
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow() {
  //   let self = this;
  //   let roleList = this.data.getRoleList();
  //   wx.getStorage({
  //     key: 'account',
  //     success: function(res) {

  //     }
  //   })
  //   let graduationRoleList = this.data.graduationRoleList;

  // },

  /**
   * 查询已经登录的角色
   */
  deepColor() {
    let self = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        let logoRole;
        let roleList = self.data.roleList;
        let graduationRoleList = self.data.graduationRoleList;
        for (let i = 0; i < roleList.length; i++) {
          if (JSON.stringify(roleList[i]) == JSON.stringify(res.data)) {
            logoRole = i;
            break;
          }
        }
        if (!logoRole) {
          for (let i = 0; i < graduationRoleList.length; i++) {
            if (JSON.stringify(roleList[i]) == JSON.stringify(res.data)) {
              logoRole = i;
              break;
            }
          }
        }
        self.setData({
          logoRole: logoRole
        })
      }
    })
  },

  /**
   * 显示已毕业角色
   */
  showGraduationRole() {
    let showGraduationRole = this.data.showGraduationRole;
    this.setData({
      showGraduationRole: !showGraduationRole
    })
  },

  /**
   * 选中角色，登录角色
   */
  selectedRole(e) {
    let graduation = e.currentTarget.dataset.graduation;
    let index = e.currentTarget.dataset.index;
    let userInfo; //用户信息
    graduation == "true" ?
      userInfo = this.data.graduationRoleList[index] :
      userInfo = this.data.roleList[index];
    let career = userInfo.career;
    wx.setStorage({
      key: 'userInfo',
      data: userInfo
    })
    if (career == "家长")
      wx.switchTab({
        url: '/pages/index/index'
      })
    else if (career == "老师")
      wx.reLaunch({
        url: '/pages/client_teacher/campus/index'
      })
  }
})